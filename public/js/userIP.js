exports.getUserIP=(req,res,next)=>{
    const addr=req.headers['x-forwarded-for']||req.connection.remoteAddress;
    return addr;
}