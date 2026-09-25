const z  = require("zod");
const registerSchema =z.object({
    body:z.object({
        name:z.string()
            .trim()
            .min(4)
            .max(20),
        email:z.string()
            .trim()
            .email("invalid email"),
        role:z.enum(["student","admin","librarian"]),
        password:z.string()
                .min(3)
                .max(15),
        confirmpassword:z.string()
                        .min(3)
                        .max(15)
    }).refine((data)=>data.password===data.confirmpassword,{message:"password didn't match",path:["confirmpassword"]}),
    params:z.object({}),
    query:z.object({})
})
const loginSchema = z.object({
    body:z.object({
        email:z.string()
            .trim()
            .email(),
        password:z.string()
                .min(3)
                .max(15),
    }),
    params:z.object({}),
    query:z.object({})
})
module.exports = {registerSchema, loginSchema};