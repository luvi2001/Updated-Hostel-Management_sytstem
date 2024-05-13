const HealthInfo = require("../models/HealthInfo");
const { z } = require("zod");

const createHealthInfoSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
});

const healthInfoController = {
  // create healthInfo
  createHealthInfo: async (req, res) => {
    try {
      const { title, description, category } = req.body;
      //const author = req.userId;

      // validation
      createHealthInfoSchema.parse(req.body);

      const newHealthInfo = new HealthInfo({
        title,
        description,
        category,
        //author,
      });

      const savedHealthInfo = await newHealthInfo.save();

      res.status(201).json({
        success: true,
        healthInfo: savedHealthInfo,
        message: "HealthInfo created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all healthInfos
  getHealthInfos: async (req, res) => {
    try {
      const healthInfos = await HealthInfo.find()

      res.status(200).json({ success: true, healthInfos });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get healthInfo by id
  getHealthInfoById: async (req, res) => {
    try {
      const healthInfoId = req.params.id;
      const healthInfo = await HealthInfo.findById(healthInfoId).populate(
        "author",
        ["name", "email", "specialty"]
      );

      if (!healthInfo) {
        return res.status(404).json({
          success: false,
          message: "HealthInfo not found",
        });
      }

      res.status(200).json({ success: true, healthInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update healthInfo
  updateHealthInfo: async (req, res) => {
    try {
      const healthInfoId = req.params.id;
      const healthInfo = await HealthInfo.findById(healthInfoId);

      if (!healthInfo) {
        return res.status(404).json({
          success: false,
          message: "HealthInfo not found",
        });
      }

      const updatedHealthInfo = await HealthInfo.findByIdAndUpdate(
        healthInfoId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        healthInfo: updatedHealthInfo,
        message: "HealthInfo updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete healthInfo
  deleteHealthInfo: async (req, res) => {
    try {
      const { id } = req.params;
      // Perform deletion logic here, for example:
      await HealthInfo.findByIdAndDelete(id);
      res.status(200).send({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).send({ error: "An error occurred while deleting the student" });
    }
  },

  // get healthInfos count using aggregation
  getHealthInfosCount: async (req, res) => {
    try {
      const healthInfosCount = await HealthInfo.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: healthInfosCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = healthInfoController;
