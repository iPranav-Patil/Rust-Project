pub mod set_user;
pub use set_user::*;

pub mod auth_user;
pub use auth_user::*;

pub mod appliances;
pub use appliances::*;

pub mod men;
pub use men::*;

pub mod women;
pub use women::*;

pub mod addto_cart;
pub use addto_cart::*;

pub mod cart;
pub use cart::*;

pub mod update_quantity;
pub use update_quantity::*;

pub mod remove_item;
pub use remove_item::*;


pub mod user_data;
pub use user_data::*;

pub mod data;
pub use data::*;

pub fn logging(path: &str) {
    println!("{path}");
}
