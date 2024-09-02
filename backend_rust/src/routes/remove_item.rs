use actix_web::{
    delete,
    web::{self, Json},
    HttpResponse, Responder,
};
use mongodb::{bson::doc, Collection};
use serde::{Deserialize, Serialize};

use crate::{logging, BioData};

#[derive(Serialize, Deserialize, Debug)]
struct RemoveItem {
    email: String,
    item_name: String,
}

#[delete("/cart/item")]
async fn remove_item(
    item_removal: Json<RemoveItem>,
    collection: web::Data<Collection<BioData>>,
) -> impl Responder {
    logging("DELETE /cart/item");
    let filter = doc! {"email": &item_removal.email};
    let update = doc! {
        "$pull": { "cart": { "name": &item_removal.item_name } }
    };

    match collection.update_one(filter, update).await {
        Ok(update_result) => {
            if update_result.modified_count == 1 {
                HttpResponse::Ok().body("Item removed from cart")
            } else {
                HttpResponse::NotFound().body("Item not found in cart")
            }
        }
        Err(_) => HttpResponse::InternalServerError().body("Failed to remove item from cart"),
    }
}
