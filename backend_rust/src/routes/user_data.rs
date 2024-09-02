use crate::{logging, BioData, UserData};
use actix_web::{
    post,
    web::{self, Json},
    HttpResponse, Responder,
};
use mongodb::{bson::doc, Collection};

#[post("/user_data")]
async fn user_data(
    data: Json<UserData>,
    collection: web::Data<Collection<BioData>>,
) -> impl Responder {
    logging("POST /user_data");

    let filter = doc! { "email": &data.email };
    let update_data = doc! {
        "$set": {
            "address": &data.address,
            "number": &data.number
        }
    };

    match collection.update_one(filter.clone(), update_data).await {
        Ok(_) => match collection.find_one(filter).await {
            Ok(Some(user)) => HttpResponse::Ok().json(user),
            Ok(None) => HttpResponse::Ok().body("User not found"),
            Err(e) => HttpResponse::InternalServerError().body(format!("DB error: {}", e)),
        },
        Err(e) => HttpResponse::InternalServerError().body(format!("Update error: {}", e)),
    }
}
