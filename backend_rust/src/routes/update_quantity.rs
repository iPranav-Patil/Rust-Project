use actix_web::{
    put,
    web::{self, Json},
    HttpResponse, Responder,
};
use mongodb::{bson::doc, Collection};
use serde::{Deserialize, Serialize};

use crate::{logging, BioData};

#[derive(Serialize, Deserialize, Debug)]
struct UpdateQuantity {
    email: String,
    item_name: String,
    quantity: i32,
}

#[put("/cart/quantity")]
async fn update_quantity(
    quantity_update: Json<UpdateQuantity>,
    collection: web::Data<Collection<BioData>>,
) -> impl Responder {
    logging("PUT /cart/quantity");
    let filter = doc! {"email": &quantity_update.email, "cart.name": &quantity_update.item_name};
    let update = doc! {
        "$set": { "cart.$.quantity": quantity_update.quantity }
    };

    match collection.update_one(filter, update).await {
        Ok(update_result) => {
            if update_result.matched_count == 1 {
                HttpResponse::Ok().body("Quantity updated")
            } else {
                HttpResponse::NotFound().body("Item not found in cart")
            }
        }
        Err(_) => HttpResponse::InternalServerError().body("Failed to update quantity"),
    }
}
