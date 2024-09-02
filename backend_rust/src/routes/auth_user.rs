use crate::{logging, BioData, LoginData};
use actix_web::{
    post,
    web::{self, Json},
    HttpResponse, Responder,
};
use bcrypt::verify;
use chrono::Utc;
use dotenv::dotenv;
use jsonwebtoken::{encode, EncodingKey, Header};
use mongodb::{bson::doc, Collection};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: usize,
}

#[post("/login")]
pub async fn auth_user(
    login_data: Json<LoginData>,
    collection: web::Data<Collection<BioData>>,
) -> impl Responder {
    logging("POST /login");

    let filter = doc! {"email" : &login_data.email};
    let user = match collection.find_one(filter).await {
        Ok(Some(user)) => user,
        Ok(None) => return HttpResponse::Ok().body("User not found"),
        Err(_) => return HttpResponse::InternalServerError().body("DB error"),
    };

    let is_valid = match verify(&login_data.password, &user.password) {
        Ok(valid) => valid,
        Err(_) => false,
    };

    // println!("login:{} \n user:{}", login_data.password, user.password);
    if is_valid {
        dotenv().ok();
        let secret = env::var("JWT_SECRET_KEY").expect("Invalid Key");
        let expiration = Utc::now()
            .checked_add_signed(chrono::Duration::seconds(3600))
            .expect("valid timestamp")
            .timestamp() as usize;
        let claims = Claims {
            sub: user.email.clone(),
            exp: expiration,
        };

        let token = encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(secret.as_ref()),
        );
        println!("Token Sent!");
        match token {
            Ok(token) => HttpResponse::Ok().json(json!({ "token": token, "user": user })),
            Err(_) => HttpResponse::InternalServerError().body("Token creation error"),
        }
    } else {
        println!("Invalid user");
        HttpResponse::Unauthorized().body("Invalid email or password")
    }
}
