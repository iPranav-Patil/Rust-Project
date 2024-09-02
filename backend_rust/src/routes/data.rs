use mongodb::bson::Array;
use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Debug)]
pub struct BioData {
    pub name: String,
    pub email: String,
    pub password: String,
    #[serde(default)]
    pub address: String,
    #[serde(default)]
    pub number: i64,
    #[serde(default)]
    pub cart: Array,
    #[serde(default)]
    pub orders: Array,
}

impl BioData {
    pub fn new(name: String, email: String, password: String) -> Self {
        Self {
            name,
            email,
            password,
            cart: Array::new(),
            orders: Array::new(),
            address: String::new(),
            number: 0,
        }
    }
}
#[derive(Deserialize, Serialize)]
pub struct LoginData {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Appliance {
    pub id: i32,
    pub name: String,
    pub rating: f32,
    pub price: String,
    pub description: String,
    pub img: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Men {
    pub id: i32,
    pub name: String,
    pub rating: f32,
    pub price: String,
    pub description: String,
    pub img: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Women {
    pub id: i32,
    pub name: String,
    pub rating: f32,
    pub price: String,
    pub description: String,
    pub img: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CartItem {
    pub id: i32,
    pub name: String,
    pub rating: f64,
    pub price: String,
    pub description: String,
    pub img: String,
    pub quantity: i32,
    pub category: String,
    pub email: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Email {
    pub email: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserData {
    pub email: String,
    pub address: String,
    pub number: i64,
}