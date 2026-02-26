import {cnPool} from '../DB.js'

const ControllVehiculo = {}

ControllVehiculo.getVehiculos = async (req,res)=>{
    
}
ControllVehiculo.createVehiculos = async(req,res)=>{
    
    console.log(req.body);
    res.send('hola desde crear')
}

ControllVehiculo.updateVehiculos  = async(req,res)=>{
    
}
ControllVehiculo.deleteVehiculos = async(req,res)=>{
    
}

export default ControllVehiculo