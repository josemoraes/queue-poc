import Mail from "../lib/Mail";

export default {
  key: "UserReport",
  async handle({ data }) {
    const { user } = data;
    await Mail.sendMail({
      from: "Report Test <queue@queuetest.com.br>",
      to: `${user.name} <${user.email}>`,
      subject: "Relatório de teste",
      html: `Olá, ${user.name}. Segue anexo, seu relatório.`,
    });
  },
};
