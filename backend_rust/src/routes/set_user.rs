use crate::{logging, BioData};
use actix_web::{
    post,
    web::{self, Json},
    HttpResponse, Responder,
};
use bcrypt::{hash, DEFAULT_COST};
use mongodb::{bson::doc, Collection};

#[post("/user")]
pub async fn create_user(
    new_user: Json<BioData>,
    collection: web::Data<Collection<BioData>>,
) -> impl Responder {
    logging("POST /user");

    let hashed = match hash(&new_user.password, DEFAULT_COST) {
        Ok(hashed) => hashed,
        Err(_) => return HttpResponse::InternalServerError().body("Failed to hash password"),
    };

    let user = BioData::new(
        new_user.name.clone(),
        new_user.email.clone(),
        hashed.clone(),
    );

    let filter = doc! {"email": &user.email};
    let existing_user = collection.find_one(filter).await.unwrap();
    match existing_user {
        Some(user_data) => HttpResponse::Ok().json(user_data),
        None => {
            let insert_result = collection.insert_one(&user).await;
            println!("Create user called");
            match insert_result {
                Ok(_) => HttpResponse::Created().json(&user),
                Err(_) => HttpResponse::InternalServerError().body("Failed to add user"),
            }
        }
    }
}
