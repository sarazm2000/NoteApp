package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	proto "grpc_tutorial/proto/github.com/example/path/gen"

	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	tlsCredentials, err := loadTLSCredentials()
	if err != nil {
		log.Fatal("cannot load TLS credentials: ", err)
	}

	// --port=8080
	port := os.Args[1:][0][7:]

	conn, err := grpc.Dial("localhost:"+port, grpc.WithTransportCredentials(tlsCredentials))
	if err != nil {
		panic(err)
	}

	client := proto.NewAddServiceClient(conn)

	g := gin.Default()
	g.GET("/SetKey/:a/:b", func(ctx *gin.Context) {
		// a, err := strconv.ParseUint(ctx.Param("a"), 10, 64)
		// if err != nil {
		// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Parameter A"})
		// 	return
		// }

		// b, err := strconv.ParseUint(ctx.Param("b"), 10, 64)
		// if err != nil {
		// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Parameter B"})
		// 	return
		// }
		a := ctx.Param("a")
		b := ctx.Param("b")

		// req := &proto.Request2{A: int64(a), B: int64(b)}
		req := &proto.Request2{A: a, B: b}
		if response, err := client.SetKey(ctx, req); err == nil {
			ctx.JSON(http.StatusOK, gin.H{
				"result": fmt.Sprint(response.Result),
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
	})

	g.GET("/GetKey/:a", func(ctx *gin.Context) {
		// a, err := strconv.ParseUint(ctx.Param("a"), 10, 64)
		// if err != nil {
		// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Parameter A"})
		// 	return
		// }
		// b, err := strconv.ParseUint(ctx.Param("b"), 10, 64)
		// if err != nil {
		// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Parameter B"})
		// 	return
		// }
		// req := &proto.Request1{A: int64(a)} //, B: int64(b)}
		a := ctx.Param("a")
		req := &proto.Request1{A: a}
		if response, err := client.GetKey(ctx, req); err == nil {
			ctx.JSON(http.StatusOK, gin.H{
				"result": fmt.Sprint(response.Result),
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
	})

	g.GET("/Clear", func(ctx *gin.Context) {

		req := &proto.Request0{}

		if response, err := client.Clear(ctx, req); err == nil {
			ctx.JSON(http.StatusOK, gin.H{
				"result": fmt.Sprint(response.Result),
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
	})

	if err := g.Run(":8081"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}

}

func loadTLSCredentials() (credentials.TransportCredentials, error) {
	// Load certificate of the CA who signed server's certificate
	pemServerCA, err := ioutil.ReadFile("../cert/ca-cert.pem")
	if err != nil {
		return nil, err
	}

	certPool := x509.NewCertPool()
	if !certPool.AppendCertsFromPEM(pemServerCA) {
		return nil, fmt.Errorf("failed to add server CA's certificate")
	}

	// Create the credentials and return it
	config := &tls.Config{
		RootCAs: certPool,
	}

	return credentials.NewTLS(config), nil
}
