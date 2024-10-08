use actix_cors::Cors;
use actix_web::{
    get,
    web::{self},
    App, HttpServer, Responder,
};
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use std::env;

mod routes;
use routes::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    //Port Init
    let port: u16 = env::var("PORT")
        .unwrap_or_else(|_| "8000".to_string())
        .parse()
        .expect("PORT must be a number");

    //MongoDB Setup
    let db_url = env::var("MONGODB_URI").expect("MONGODB_URI must be set");
    let client_options = ClientOptions::parse(&db_url).await.unwrap();
    let client = Client::with_options(client_options).unwrap();
    println!("\nConnection with DB made successfully...");

    //DB and Collection
    let db = client.database("Ecommerce");
    let user_collection = db.collection::<BioData>("users");
    let appliance_collection = db.collection::<Appliance>("Appliances");
    let men_collection = db.collection::<Men>("Men");
    let women_collection = db.collection::<Women>("Women");
    println!("Database found and we are connected with MongoDB...");

    //Actix Web Server Init
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .app_data(web::Data::new(user_collection.clone()))
            .app_data(web::Data::new(appliance_collection.clone()))
            .app_data(web::Data::new(women_collection.clone()))
            .app_data(web::Data::new(men_collection.clone()))
            .wrap(cors)
            .service(home)
            .service(create_user)
            .service(auth_user)
            .service(appliance_call)
            .service(get_men)
            .service(get_women)
            .service(addto_cart)
            .service(cart)
            .service(update_quantity)
            .service(remove_item)
            .service(user_data)
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await?;

    Ok(())
}

#[get("/home")]
async fn home() -> impl Responder {
    "Welcome to Server".to_string()
}

// my_project/
// ├── src/
// │   ├── main.rs
// │   ├── routes/
// │   │   ├── mod.rs
// │   │   ├── set_user.rs
// │   │   └── data.rs
// ├── .env
// ├── Cargo.toml
// └── Cargo.lock
