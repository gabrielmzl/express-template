import express, { Response, Request } from "express";

var app = express();

app.get("/", function (req: Request, res: Response) {
  res.send("api works");
});

app.post("/consultar", async function (req: Request, res: Response) {
  try {
    const { cpf } = req.body.cpf;

    const url = 'https://api.arcadiancenter.com/token/2074815d-58c9-4299-865c-fec493b6460d/CpfSimples/' + cpf
    const { data } = await axios.post(url);

    if (data.ac_service.msg === "Dados não encontrado!" || data.code === "08") {
      const code = 0

      res.status(201).json({
        success: true,
        consulta: code
      });
    } else {
      const parsedData = {
        code: 1,
        nome: data.ac_service['Dados Pessoais'].Nome,
        nome_social: data.ac_service['Dados Pessoais']['Nome Social'],
        sexo: data.ac_service['Dados Pessoais'].Sexo,
        conjuge: data.ac_service['Dados Pessoais'].Conjuge,
        cpf: data.ac_service['Dados Pessoais'].CPF,
        cpfConjuge: data.ac_service['Dados Pessoais']['CPF do Conjuge'],
        dtSitCad: data.ac_service['Dados Pessoais']['DT Sit Cad'],
        enderecoNascimento: data.ac_service['Dados Pessoais']['Endereco de Nascimento'],
        racaCor: data.ac_service['Dados Pessoais']['Raca/Cor'],
        falecido: data.ac_service['Dados Pessoais'].Falecido,
        dataFalecimento: data.ac_service['Dados Pessoais']['Data Falecimento']
      }

      res.status(201).json({
        success: true,
        consulta: parsedData
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
});

if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

export default app;
