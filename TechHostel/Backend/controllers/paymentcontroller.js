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


module.exports={ewalletCreate,addExpenses,getExpense,createExpense}