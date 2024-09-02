use crate::{logging, Appliance, BioData, CartItem, Men, Women};
use actix_web::{
    post,
    web::{self, Json},
    HttpResponse, Responder,
};
use mongodb::{
    bson::{self, doc},
    Collection,
};

#[post("/addtocart")]
async fn addto_cart(
    item: Json<CartItem>,
    appliance_collection: web::Data<Collection<Appliance>>,
    men_collection: web::Data<Collection<Men>>,
    women_collection: web::Data<Collection<Women>>,
    user_collection: web::Data<Collection<BioData>>,
) -> impl Responder {
    logging("POST /addtocart");

    let email = item.email.clone();
    let mut item_inner = item.into_inner();
    item_inner.email = String::new();

    let mut item_doc = bson::to_document(&item_inner).unwrap();
    item_doc.remove("email");

    match item_inner.category.as_str() {
        "appliances" => {
            let filter = doc! {"name": &item_inner.name};
            let result = appliance_collection.find_one(filter).await;

            match result {
                Ok(Some(_)) => {
                    let user_filter = doc! {"email": &email, "cart.name": &item_inner.name};
                    let user_cart_item = user_collection.find_one(user_filter.clone()).await;

                    match user_cart_item {
                        Ok(Some(_)) => {
                            let update = doc! {
                                "$inc": { "cart.$.quantity": &item_inner.quantity }
                            };
                            match user_collection.update_one(user_filter, update).await {
                                Ok(_) => HttpResponse::Ok().body("Item quantity updated in cart"),
                                Err(_) => {
                                    HttpResponse::InternalServerError().body("Error updating cart")
                                }
                            }
                        }

                        Ok(None) => {
                            let user_filter = doc! {"email": &email};
                            let update = doc! {"$push": {"cart": item_doc}};

                            match user_collection.update_one(user_filter, update).await {
                                Ok(_) => return HttpResponse::Ok().body("Item added to cart"),
                                Err(_) => {
                                    return HttpResponse::InternalServerError()
                                        .body("Error adding to cart")
                                }
                            }
                        }
                        Err(_) => {
                            return HttpResponse::InternalServerError()
                                .body("Error searching for item in cart")
                        }
                    }
                }
                Ok(None) => HttpResponse::NotFound().body("Item not found"),
                Err(_) => HttpResponse::InternalServerError().body("Error searching for item"),
            }
        }
        "men" => {
            let filter = doc! {"name": &item_inner.name};
            let result = men_collection.find_one(filter).await;

            match result {
                Ok(Some(_)) => {
                    let user_filter = doc! {"email": &email, "cart.name": &item_inner.name};
                    let user_cart_item = user_collection.find_one(user_filter.clone()).await;

                    match user_cart_item {
                        Ok(Some(_)) => {
                            let update = doc! {
                                "$inc": { "cart.$.quantity": &item_inner.quantity }
                            };
                            match user_collection.update_one(user_filter, update).await {
                                Ok(_) => HttpResponse::Ok().body("Item quantity updated in cart"),
                                Err(_) => {
                                    HttpResponse::InternalServerError().body("Error updating cart")
                                }
                            }
                        }

                        Ok(None) => {
                            let user_filter = doc! {"email": &email};
                            let update = doc! {"$push": {"cart": item_doc}};

                            match user_collection.update_one(user_filter, update).await {
                                Ok(_) => HttpResponse::Ok().body("Item added to cart"),
                                Err(_) => {
                                    HttpResponse::InternalServerError().body("Error adding to cart")
                                }
                            }
                        }
                        Err(_) => {
                            return HttpResponse::InternalServerError()
                                .body("Error searching for item in cart")
                        }
                    }
                }
                Ok(None) => HttpResponse::NotFound().body("Item not found"),
                Err(_) => HttpResponse::InternalServerError().body("Error searching for item"),
            }
        }
        "women" => {
            let filter = doc! {"name": &item_inner.name};
            let result = women_collection.find_one(filter).await;

            match result {
                Ok(Some(_)) => {
                    let user_filter = doc! {"email": &email, "cart.name": &item_inner.name};
                    let user_cart_item = user_collection.find_one(user_filter.clone()).await;

                    match user_cart_item {
                        Ok(Some(_)) => {
                            let update = doc! {
                                "$inc": { "cart.$.quantity": &item_inner.quantity }
                            };
                            match user_collection.update_one(user_filter, update).await {
                                Ok(_) => HttpResponse::Ok().body("Item quantity updated in cart"),
                                Err(_) => {
                                    HttpResponse::InternalServerError().body("Error updating cart")
                                }
                            }
                        }

                        Ok(None) => {
                            let user_filter = doc! {"email": &email};
                            let update = doc! {"$push": {"cart": item_doc}};

                            match user_collection.update_one(user_filter, update).await {
                                Ok(_) => HttpResponse::Ok().body("Item added to cart"),
                                Err(_) => {
                                    HttpResponse::InternalServerError().body("Error adding to cart")
                                }
                            }
                        }
                        Err(_) => {
                            return HttpResponse::InternalServerError()
                                .body("Error searching for item in cart")
                        }
                    }
                }
                Ok(None) => HttpResponse::NotFound().body("Item not found"),
                Err(_) => HttpResponse::InternalServerError().body("Error searching for item"),
            }
        }
        _ => HttpResponse::BadRequest().body("Invalid category"),
    }
}
