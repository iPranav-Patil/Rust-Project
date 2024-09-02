use actix_web::{
    get,
    web::{self},
    HttpResponse, Responder,
};
use futures::StreamExt;
use mongodb::{bson::doc, Collection};

use crate::{Men,logging};

#[get("/men")]
async fn get_men(collection: web::Data<Collection<Men>>) -> impl Responder {
    logging("GET /men");
    let mut men = Vec::new();
    let mut search = collection
        .find(doc! {})
        .await
        .expect("Could not query database");
    while let Some(result) = search.next().await {
        match result {
            Ok(man) => men.push(man),
            Err(_) => return HttpResponse::InternalServerError().body("Data not found"),
        }
    }
    HttpResponse::Ok().json(men)
}
