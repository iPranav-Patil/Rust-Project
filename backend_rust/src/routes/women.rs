use actix_web::{
    get, web::{self}, HttpResponse, Responder
};
use futures::StreamExt;
use mongodb::{bson::doc, Collection};

use crate::{Women,logging};

#[get("/women")]
async fn get_women(collection: web::Data<Collection<Women>>) ->impl Responder{
    logging("GET /women");
    let mut women = Vec::new();
    let mut search = collection.find(doc!{}).await.expect("Could not query data");
    while let Some(result) = search.next().await{
        match result{
            Ok(woman) => women.push(woman),
            Err(_) => return HttpResponse::InternalServerError().body("Could not find data")
        }
    }
    HttpResponse::Ok().json(women)
}