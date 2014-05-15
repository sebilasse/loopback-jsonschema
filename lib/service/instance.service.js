var logger = require('../support/logger');

var JsonSchema = require('../models/json-schema');

var InstanceService = function(ljsReq, res) {
    this.ljsReq = ljsReq;
    this.res = res;
};

InstanceService.prototype.handleRequest = function(jsonSchema) {
    // Register Loopback Model for given Collection
    jsonSchema.createLoopbackModel(this.ljsReq.req.app);
    logger.info("Loopback Model created for JSON Schema collectionName:", this.ljsReq.collectionName);
};

InstanceService.prototype.handleResponse = function(jsonSchema) {
    jsonSchema.addHeaders(this.ljsReq, this.res);
    logger.info("Json Schema headers added.", this.ljsReq.collectionName);
};

InstanceService.prototype.build = function(next) {
    var collectionName = this.ljsReq.collectionName;

    var self = this;
    JsonSchema.findByCollectionName(collectionName, next, function(jsonSchema) {
        self.handleRequest(jsonSchema);
        self.handleResponse(jsonSchema);
    });
};

module.exports = InstanceService;