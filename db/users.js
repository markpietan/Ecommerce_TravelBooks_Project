const { client } = require("./index")
// await client.connect()



async function createUser({email, password}){
try {
    await client.connect()
    const response = await client.query(`
    INSERT INTO users(email, password)
    VALUES($1, $2)
    ON CONFLICT DO NOTHING;
    `, [email, password])
    console.log(response.rows)
    return response.rows
} catch (error) {
    throw error
}
}


createUser({
    email: "kjvieivuv@yahoo.com",
    password: "jsbdviuebvivbqv"
}).then(function(data){
console.log(data)
})