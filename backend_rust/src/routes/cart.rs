use crate::{logging, BioData, Email};
use actix_web::{
    post,
    web::{self, Json},
    HttpResponse, Responder,
};
use mongodb::{bson::doc, Collection};

#[post("/cart")]
async fn cart(
    user_email: Json<Email>,
    collection: web::Data<Collection<BioData>>,
) -> impl Responder {
    logging("POST /cart");
    let filter = doc! {"email": &user_email.email};
    let _user = match collection.find_one(filter).await {
        Ok(Some(user)) => return HttpResponse::Ok().json(user),
        Ok(None) => return HttpResponse::NotFound().body("User not found"),
        Err(_) => return HttpResponse::InternalServerError().body("Database query failed"),
    };

}
