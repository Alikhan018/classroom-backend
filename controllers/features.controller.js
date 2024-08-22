const db = require("../models");

class FeatureController {
  constructor() {}

  static async getFeaturesByEntityType(req, res) {
    try {
      const features = await db.Feature.findAll();
      const featuresByEntityType = {};
      features.forEach((feature) => {
        const entityType = feature.entityType;
        if (!featuresByEntityType[entityType]) {
          featuresByEntityType[entityType] = [];
        }
        featuresByEntityType[entityType].push(feature.name);
      });
      const featuresData = Object.keys(featuresByEntityType).map(
        (entityType) => ({
          entityType,
          names: featuresByEntityType[entityType],
        })
      );
      res.json({
        status: "success",
        data: featuresData,
      });
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  }
}

module.exports = FeatureController;
