import { SQLiteDatabase } from "expo-sqlite";

export async function seed(database: SQLiteDatabase) {
  console.log("[SEED] Populating database...");
  await database.withTransactionAsync(async () => {
    const { lastInsertRowId: streamingCategoryId } = await database.runAsync(
      `INSERT OR IGNORE INTO categories (name) VALUES (?)`,
      ["Streaming"]
    );
    console.log("[SEED] Streaming category created.", streamingCategoryId);

    const accounts = [
      {
        name: "Sicredi",
        slug: "sicredi",
        first_color: "#70bd86",
        second_color: "#2d5042",
        type: "bank",
      },
      {
        name: "Banrisul",
        slug: "banrisul",
        first_color: "#6798bd",
        second_color: "#2d3250",
        type: "bank",
      },
      {
        name: "Bradesco",
        slug: "bradesco",
        first_color: "#bd6796",
        second_color: "#502d38",
        type: "bank",
      },
      {
        name: "Banco do Brasil",
        slug: "banco_do_brasil",
        first_color: "#bda767",
        second_color: "#503b2d",
        type: "bank",
      },
      {
        name: "Santander",
        slug: "santander",
        first_color: "#bd6796",
        second_color: "#502d38",
        type: "bank",
      },
      {
        name: "Itaú",
        slug: "itau",
        first_color: "#bd8967",
        second_color: "#50352d",
        type: "bank",
      },
      {
        name: "Caixa",
        slug: "caixa",
        first_color: "#6798bd",
        second_color: "#2d3250",
        type: "bank",
      },
      {
        name: "PicPay",
        slug: "picpay",
        first_color: "#70bd86",
        second_color: "#2d5042",
        type: "digital_wallet",
      },
      {
        name: "PayPal",
        slug: "paypal",
        first_color: "#6798bd",
        second_color: "#2d3250",
        type: "digital_wallet",
      },
      {
        name: "MercadoPago",
        slug: "mercadopago",
        first_color: "#6798bd",
        second_color: "#2d3250",
        type: "digital_wallet",
      },
      {
        name: "Inter",
        slug: "inter",
        first_color: "#bd8967",
        second_color: "#50352d",
        type: "bank",
      },
      {
        name: "Nubank",
        slug: "nubank",
        first_color: "#8467bd",
        second_color: "#392d50",
        type: "digital_wallet",
      },
      {
        name: "Neon",
        slug: "neon",
        first_color: "#6798bd",
        second_color: "#2d3250",
        type: "digital_wallet",
      },
      {
        name: "C6",
        slug: "c6",
        first_color: "#949398",
        second_color: "#3d3d3e",
        type: "bank",
      },
    ];

    for (const { name, slug, first_color, second_color, type } of accounts) {
      await database.runAsync(
        `INSERT OR IGNORE INTO accounts (name, slug, first_color, second_color, type) VALUES (?, ?, ?, ?, ?)`,
        [name, slug, first_color, second_color, type]
      );

      console.log(`[SEED] Account ${name} (${slug}) created.`);
    }

    const streamings = [
      {
        title: "Netflix Padrão com anúncios",
        description: "Inscrição mensal",
        default_value: 20.9,
        type: "fixed",
      },
      {
        title: "Netflix Padrão",
        description: "Inscrição mensal",
        default_value: 44.9,
        type: "fixed",
      },
      {
        title: "Netflix Premium",
        description: "Inscrição mensal",
        default_value: 59.9,
        type: "fixed",
      },
      {
        title: "Prime Video com anúncios",
        description: "Inscrição mensal",
        default_value: 19.9,
        type: "fixed",
      },
      {
        title: "Prime Video sem anúncios",
        description: "Inscrição mensal",
        default_value: 29.9,
        type: "fixed",
      },
      {
        title: "Paramount+ Básico",
        description: "Inscrição mensal",
        default_value: 18.9,
        type: "fixed",
      },
      {
        title: "Paramount+ Padrão",
        description: "Inscrição mensal",
        default_value: 27.9,
        type: "fixed",
      },
      {
        title: "Paramount+ Premium",
        description: "Inscrição mensal",
        default_value: 34.9,
        type: "fixed",
      },
      {
        title: "HBO Max Básico com anúncios",
        description: "Inscrição mensal",
        default_value: 29.9,
        type: "fixed",
      },
      {
        title: "HBO Max Standart",
        description: "Inscrição mensal",
        default_value: 39.9,
        type: "fixed",
      },
      {
        title: "HBO Max Platinum",
        description: "Inscrição mensal",
        default_value: 55.9,
        type: "fixed",
      },
      {
        title: "AppleTV",
        description: "Inscrição mensal",
        default_value: 29.9,
        type: "fixed",
      },
      {
        title: "YouTube Premium Individual",
        description: "Inscrição mensal",
        default_value: 26.9,
        type: "fixed",
      },
      {
        title: "YouTube Premium Família",
        description: "Inscrição mensal",
        default_value: 53.9,
        type: "fixed",
      },
      {
        title: "YouTube Premium Estudante",
        description: "Inscrição mensal",
        default_value: 16.9,
        type: "fixed",
      },
      {
        title: "Spotify Premium Individual",
        description: "Inscrição mensal",
        default_value: 23.9,
        type: "fixed",
      },
      {
        title: "Spotify Premium Duo",
        description: "Inscrição mensal",
        default_value: 31.9,
        type: "fixed",
      },
      {
        title: "Spotify Premium Família",
        description: "Inscrição mensal",
        default_value: 40.9,
        type: "fixed",
      },
      {
        title: "Spotify Premium Universitário",
        description: "Inscrição mensal",
        default_value: 31.9,
        type: "fixed",
      },
    ];

    for (const { title, description, default_value, type } of streamings) {
      const { lastInsertRowId: expenseId } = await database.runAsync(
        `INSERT OR IGNORE INTO expenses (title, description, default_value, type) VALUES (?, ?, ?, ?)`,
        [title, description, default_value, type]
      );
      console.log(`[SEED] Expense ${title} created.`);

      await database.runAsync(
        `INSERT OR IGNORE INTO expense_categories (expense_id, category_id) VALUES (?, ?)`,
        [expenseId, streamingCategoryId]
      );
      console.log(
        `[SEED] Expense ${title} connected to category ${streamingCategoryId}.`
      );
    }
  });
}
