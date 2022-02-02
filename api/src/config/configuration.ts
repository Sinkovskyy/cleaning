export const configuration = () => {
    return {
        port: process.env.PORT,


        db_login: process.env.DB_LOGIN,
        db_password: process.env.DB_PASSWORD,


        jwt_secret: process.env.JWT_SECRET,
        jwt_expire_data: process.env.JWT_EXPIRE_DATA

    }
}