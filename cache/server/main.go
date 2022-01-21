package main

import (
	"context"
	"crypto/tls"
	"log"
	"net"
	"strconv"
	"sync"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/reflection"

	proto "grpc_tutorial/proto/github.com/example/path/gen"

	// lru "./lru"
	"container/list"
	"os"
)

//KeyPair: defines the cache structure to be stored in LRUCache
type KeyPair struct {
	key   string
	value string
}

//LRUCache definition for Least Recently Used Cache implementation.
type LRUCache struct {
	capacity int //defines a cache object of the specified capacity.
	mutex    sync.Mutex
	list     *list.List               //DoublyLinkedList for backing the cache value.
	elements map[string]*list.Element //Map to store list pointer of cache mapped to key
}

//New: creates a new LRUCache object with the defined capacity
func New(capacity int) LRUCache {
	return LRUCache{
		capacity: capacity,
		list:     new(list.List),
		elements: make(map[string]*list.Element, capacity),
	}
}

//Get: returns the cache value stored for the key, also moves the list pointer to front of the list
func (cache *LRUCache) Get(key string) string {
	if node, ok := cache.elements[key]; ok {
		cache.mutex.Lock()
		value := node.Value.(*list.Element).Value.(KeyPair).value
		cache.list.MoveToFront(node)
		cache.mutex.Unlock()
		return value
	}
	return "There is no such value in cache!"
}

//Put: Inserts the key,value pair in LRUCache.
//If list capacity is full, entry at the last index of the list is deleted before insertion.
func (cache *LRUCache) Put(key string, value string) string {
	cache.mutex.Lock()
	if node, ok := cache.elements[key]; ok {
		cache.list.MoveToFront(node)
		node.Value.(*list.Element).Value = KeyPair{key: key, value: value}
	} else {
		if cache.list.Len() == cache.capacity {
			idx := cache.list.Back().Value.(*list.Element).Value.(KeyPair).key
			delete(cache.elements, idx)
			cache.list.Remove(cache.list.Back())
		}
	}

	node := &list.Element{
		Value: KeyPair{
			key:   key,
			value: value,
		},
	}

	pointer := cache.list.PushFront(node)
	cache.elements[key] = pointer
	cache.mutex.Unlock()
	return "Saved successfully!"
}

//Purge: clears LRUCache
func (cache *LRUCache) Purge() string {
	cache.mutex.Lock()
	// cache.capacity = 0
	cache.elements = nil
	cache.list = nil
	cache.mutex.Unlock()
	lru_var = New(10)
	return "Cache has been cleared successfully!"
}

////////////////////////////////////////////

type server struct{}

var lru_var = New(10)

func main() {
	// --port=8080 --capacity=10
	port := os.Args[1:][0][7:]
	capacity, err := strconv.Atoi(os.Args[1:][1][11:])
	if port == "" {
		port = "8080"
	}
	if err != nil {
		capacity = 10
	}

	lru_var = New(capacity)

	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		panic(err)
	}

	tlsCredentials, err := loadTLSCredentials()
	if err != nil {
		log.Fatal("cannot load TLS credentials: ", err)
	}
	srv := grpc.NewServer(grpc.Creds(tlsCredentials))
	proto.RegisterAddServiceServer(srv, &server{})
	reflection.Register(srv)

	if e := srv.Serve(listener); e != nil {
		panic(e)
	}

}

func (s *server) GetKey(ctx context.Context, request *proto.Request1) (*proto.Response, error) {
	a := request.GetA()

	result := lru_var.Get(a)

	return &proto.Response{Result: result}, nil
}

func (s *server) SetKey(ctx context.Context, request *proto.Request2) (*proto.Response, error) {
	a, b := request.GetA(), request.GetB()

	result := lru_var.Put(a, b)

	return &proto.Response{Result: result}, nil
}

func (s *server) Clear(ctx context.Context, request *proto.Request0) (*proto.Response, error) {

	result := lru_var.Purge()

	return &proto.Response{Result: result}, nil
}

func loadTLSCredentials() (credentials.TransportCredentials, error) {
	// Load server's certificate and private key
	serverCert, err := tls.LoadX509KeyPair("../cert/server-cert.pem", "../cert/server-key.pem")
	if err != nil {
		return nil, err
	}

	// Create the credentials and return it
	config := &tls.Config{
		Certificates: []tls.Certificate{serverCert},
		ClientAuth:   tls.NoClientCert,
	}

	return credentials.NewTLS(config), nil
}
