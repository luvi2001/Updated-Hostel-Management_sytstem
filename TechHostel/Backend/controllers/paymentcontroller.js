const Ewallet=require('../models/ewalletmodel')
const Expense=require('../models/additionalPayment')
const Payment=require('../models/verificationmodel')


const createExpense= async(req,res) => {
    try{
        const {name,nic,issue,amount}=req.body;
        const newProfile=new Expense({
            name,
            nic,
            issue,
            amount
            
        });

        await newProfile.save();
        res.status(201).json({ message: 'Additional expenses added', data: newProfile });
    }
    catch(err){
        console.log(err)
    }
}



  const getExpense = async (req, res) => {
    try {
        const data = await Expense.find({});
        res.json({ success: true, data: data });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

const addExpenses= async(req,res) => {
    try{
        const {name,nic}=req.body;
        const newProfile=new Expense({
            name,
            nic,
            nameOfCost:' ',
            issue:' ',
            amount:0
            
        });

        await newProfile.save();
        res.status(201).json({ message: 'Additional expenses added', data: newProfile });
    }
    catch(err){
        console.log(err)
    }
}



const ewalletCreate= async(req,res) => {
    try{
        const {name,nic}=req.body;
        const newProfile=new Ewallet({
            name,
            nic,
            balance:0
            
        });

        await newProfile.save();
        res.status(201).json({ message: 'Ewallet created', data: newProfile });
    }
    catch(err){
        console.log(err)
    }
}


const deleteExpense=async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = await Expense.deleteOne({ _id: id });
    res.send({ success: true, message: "Data delete successfully", data: data });
  }

  const updateExpense= async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
  
    console.log(rest)
    const data = await Expense.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "Data update successfully", data: data })
  }


const verificationDetails=  async (req, res) => {
    try {
      const { studentName, nicNumber, accountNumber, bank, amount, date } = req.body;
  
      // Create a new payment document
      const payment = new Payment({
        studentName,
        nicNumber,
        accountNumber,
        bank,
        amount,
        date,
      });
  
      // Save payment data to the database
      await payment.save();
  
      res.json({ success: true, message: "Payment details saved successfully." });
    } catch (error) {
      console.error("Error saving payment details:", error);
      res.status(500).json({ success: false, error: "Error saving payment details." });
    }
  };

module.exports={ewalletCreate,addExpenses,getExpense,createExpense,deleteExpense,updateExpense,verificationDetails}