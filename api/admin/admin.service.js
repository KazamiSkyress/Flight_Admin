const pool = require("../../config/database");
module.exports={
    createAdmin: (data, callback) => {
        pool.query(
          `INSERT INTO ADMIN(aname,aid,email, password)
                values(?,?,?,?)`,
          [
            data.aname,
            data.aid,
            data.email,
            data.password
          ],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      },
      createNewInventory: (data, callback) => {
        pool.query(
          `INSERT INTO flightinventory(flightid,airline, FromPlace,ToPlace,StartDateTime,EndDateTime,ScDays,instruments,NoOfBuisnessClassSeats,TotalNoOfNonBuisnessClassSeats,CostPerBuisnessClassSeat,CostPerNonBuisnessClassSeat,meals,status)
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            data.flightid,
            data.airline,
            data.FromPlace,
            data.ToPlace,
            data.StartDateTime,
            data.EndDateTime,
            data.ScDays,
            data.instruments,
            data.NoOfBuisnessClassSeats,
            data.TotalNoOfNonBuisnessClassSeats,
            data.CostPerBuisnessClassSeat,
            data.CostPerNonBuisnessClassSeat,
  
            data.meals,
            data.status
          ],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      },
      updateFlight: (data, callBack) => {
        pool.query(
          `update flightinventory set airline=?, FromPlace=?,ToPlace=?,StartDateTime=?,EndDateTime=?,ScDays=?,instruments=?,NoOfBuisnessClassSeats=?,TotalNoOfNonBuisnessClassSeats=?,CostPerBuisnessClassSeat=?,CostPerNonBuisnessClassSeat=?,meals=?,status=? where flightid=?`,
          [
            
            data.airline,
            data.FromPlace,
            data.ToPlace,
            data.StartDateTime,
            data.EndDateTime,
            data.ScDays,
            data.instruments,
            data.NoOfBuisnessClassSeats,
            data.TotalNoOfNonBuisnessClassSeats,
            data.CostPerBuisnessClassSeat,
            data.CostPerNonBuisnessClassSeat,
      
            data.meals,
            data.status,
            data.flightid,
          ],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results.changedRows);
          }
        );
      },
      getAdminByAdminEmail: (email, callBack) => {
        pool.query(
          `SELECT * FROM admin WHERE email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
     search:(data,callback)=>{
      pool.query(
        `SELECT flightid,airline,StartDateTime,EndDateTime,CostPerBuisnessClassSeat,CostPerNonBuisnessClassSeat FROM flightinventory where FromPlace=? and ToPlace=? and StartDateTime=? and status=?`,
        [data.FromPlace,
         data.ToPlace,
         data.StartDateTime,
         data.status="Cancelled"
    ],
    (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
     }
}