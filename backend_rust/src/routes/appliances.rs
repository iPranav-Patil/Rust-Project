use crate::{logging, Appliance};
use actix_web::{
    get,
    web::{self},
    HttpResponse, Responder,
};
use futures::StreamExt;
use mongodb::{bson::doc, Collection};

#[get("/appliance")]
async fn appliance_call(collection: web::Data<Collection<Appliance>>) -> impl Responder {
    logging("POST /appliance");
    let mut appliances = Vec::new();
    let mut item = collection.find(doc! {}).await.expect("Could not find data");
    println!("item search");
    while let Some(result) = item.next().await {
        match result {
            Ok(appliance) => {
                // println!("appl added");
                appliances.push(appliance)
            }
            Err(_) => return HttpResponse::InternalServerError().body("Error Reading data"),
        }
    }
    // println!("{:?}",appliances);
    HttpResponse::Ok().json(appliances)
}
