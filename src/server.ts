import { createApp } from "./app";

const port = Number(process.env.PORT ?? 3000);

const { app } = createApp();

app.listen(port, () => {
  process.stdout.write(`Server listening on port ${port}\n`);
});
