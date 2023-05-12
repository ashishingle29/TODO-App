// const pendingModel = require("../model/pendingModel");
// const progressModel = require("../model/progressModel");
// const completedModel = require("../model/completedModel");
// const userModel = require("../model/userModel");
const taskModel = require("../model/taskModel");

exports.create = async (req, res) => {
  try {
    const data = req.body;
    let createdData = await taskModel.create(data);
    return res.status(201).send({
      status: true,
      message: "Task created successfully 😃",
      data: createdData,
    });

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.readByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const id = req.params.id;
    
    if (category == "All") {
      let data = await taskModel.find({userid:id});
      return res.status(200).send({
        status: true,
        data: data,
      });
    } else {
      
      let data = await taskModel.find({ userid: id, category: category });
      return res.status(200).send({
        status: true,
        data: data,
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

// exports.update = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const data = req.body;

//     let { title, content } = data;

//     let updatedData = await userModel.findOneAndUpdate(
//       { _id: id },
//       { $set: { title, content } },
//       { new: true }
//     );

//     return res.status(200).send({
//       status: true,
//       data: updatedData,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       status: false,
//       message: "Internal Server Error!",
//       error: err.message,
//     });
//   }
// };

exports.update = async (req, res) => {
  try {
    
    let Id = req.params.id;
    let Category = req.params.category
    let UpdatedCategory = "";
    console.log(Id, "id")
    console.log(Category, "category")
    
    if (Category == "Completed") {
      UpdatedCategory = "Uncompleted"
    } else if (Category == "Uncompleted") {
      UpdatedCategory = "Completed"
    }
    console.log(UpdatedCategory)

    const updatedData = await taskModel.findOneAndUpdate({ _id: Id }, { $set: { category: UpdatedCategory } }, { new: true })

    console.log(updatedData)
    return res.status(200).send({ status: true, data: updatedData })
  } catch (error) {
    return res.status(500).send({ status: false, message: "Internal Server Error!", error: error.message,});
  }
}

exports.remove = async (req, res) => {
  try {
    const Id = req.params.id;

      await taskModel.deleteOne({ _id: Id });
    

    return res.status(200).send({
      status: true,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};


