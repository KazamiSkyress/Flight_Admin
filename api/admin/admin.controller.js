const{
    createAdmin,
    createNewInventory,
    updateFlight,
    getAdminByAdminEmail,
    search
}=require("./admin.service");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const {sign}=require('jsonwebtoken');
module.exports={
    createAd: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createAdmin(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Db connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },
      createNewInventory: (req, res) => {
        const body = req.body;
        createNewInventory(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Db connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },
      updateFlight: (req, res) => {
        const body = req.body;
        updateFlight(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "failed to update the flight details!",
            });
          }
          return res.json({
            success: 1,
            message: "updated inventory sucessfully",
          });
        });
      },
      login: (req, res) => {
        const body = req.body;
        getAdminByAdminEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Invalid email or password",
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "kazami123", {
              expiresIn: "1h",
            });
            return res.json({
              success: 1,
              message: "Login sucessful",
              token: jsontoken,
            });
          } else {
            return res.json({
              success: 0,
              message: "Invalid email or password",
            });
          }
        });
      },
      search:(req,res)=>{
        const body = req.body;
        search(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).header({Location: `http://127.0.0.2:3000/api/admin/search`}).json({
              success: 0,
              message: "No flights",
            });
          }
           return res.status(200).json({
            success: 1,
            data: results,
           });
        });
      }
     
     
}