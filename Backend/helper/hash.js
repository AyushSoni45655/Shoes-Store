import bcrypt from 'bcrypt';

const hashGenrator = async(password)=>{
try{
const round = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, round);
return hash;
}catch(e){
console.log(`Error to genrate hash ${e}`);
}
}

export default hashGenrator;