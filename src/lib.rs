use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn generate_gradient() -> String {
    let degree = random_degree();
    let color1 = random_color();
    let color2 = random_color();
    format!("linear-gradient({}deg, {}, {})", degree, color1, color2)
}

fn random_color() -> String {
    let mut rng = rand::thread_rng();
    let r: u8 = rng.gen_range(0..=255);
    let g: u8 = rng.gen_range(0..=255);
    let b: u8 = rng.gen_range(0..=255);
    format!("rgb({}, {}, {})", r, g, b)
}

fn random_degree() -> u32 {
    rand::thread_rng().gen_range(0..360)
}
