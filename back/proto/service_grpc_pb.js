// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var service_pb = require('./service_pb.js');

function serialize_proto_Request0(arg) {
  if (!(arg instanceof service_pb.Request0)) {
    throw new Error('Expected argument of type proto.Request0');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_Request0(buffer_arg) {
  return service_pb.Request0.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_Request1(arg) {
  if (!(arg instanceof service_pb.Request1)) {
    throw new Error('Expected argument of type proto.Request1');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_Request1(buffer_arg) {
  return service_pb.Request1.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_Request2(arg) {
  if (!(arg instanceof service_pb.Request2)) {
    throw new Error('Expected argument of type proto.Request2');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_Request2(buffer_arg) {
  return service_pb.Request2.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_Response(arg) {
  if (!(arg instanceof service_pb.Response)) {
    throw new Error('Expected argument of type proto.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_Response(buffer_arg) {
  return service_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var AddServiceService = exports.AddServiceService = {
  getKey: {
    path: '/proto.AddService/GetKey',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.Request1,
    responseType: service_pb.Response,
    requestSerialize: serialize_proto_Request1,
    requestDeserialize: deserialize_proto_Request1,
    responseSerialize: serialize_proto_Response,
    responseDeserialize: deserialize_proto_Response,
  },
  setKey: {
    path: '/proto.AddService/SetKey',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.Request2,
    responseType: service_pb.Response,
    requestSerialize: serialize_proto_Request2,
    requestDeserialize: deserialize_proto_Request2,
    responseSerialize: serialize_proto_Response,
    responseDeserialize: deserialize_proto_Response,
  },
  clear: {
    path: '/proto.AddService/Clear',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.Request0,
    responseType: service_pb.Response,
    requestSerialize: serialize_proto_Request0,
    requestDeserialize: deserialize_proto_Request0,
    responseSerialize: serialize_proto_Response,
    responseDeserialize: deserialize_proto_Response,
  },
};

exports.AddServiceClient = grpc.makeGenericClientConstructor(AddServiceService);
