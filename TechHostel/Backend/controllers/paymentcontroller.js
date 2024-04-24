const Ewallet=require('../models/ewalletmodel')
const Expense=require('../models/additionalPayment')


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

module.exports={ewalletCreate,addExpenses,getExpense,createExpense,deleteExpense,updateExpense}