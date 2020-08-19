# Test cedro 

Esse projeto foi feito em angular, para a sua execução é só utilizar o comando `ng serve` para iniciar.

## Persistencia de dados

Os dados alem de salvos no localStorage, estão salvos tambem no db.json, ao iniciar a aplicação, caso o DB esteja vazio e o localStorage não, ele faz a transferencia de dados para manterlos iguais antes de que qualquer ação seja feita.
Para deixar o db.json vazio, deve deixar apenas a base do dado para que seja lido corretamente, da seguinte forma

```
{
  "clientes": [
   ]
}
```

## Detalhes do projeto
Dos detalhes da implementação do projeto, foram terminados todos

- [x] Formulário deve ter validação antes de submeter a API
- [x] Todos os campos são obrigatorios (os em forma de texto precisam de pelo menos quatro digitos)
- [x] Cep e Cpf contém máscaras.
- [x] Deverá seguir o style Guide do Bootstrap
- [x] Alteração e exclusão devem conter um modal de confirmação
- [x] Devera conter um Select para escolher a UF

Por questão de prazo apertado, algumas coisas não foram completadas para melhorar a qualidade e visibilidade do codigo, essas coisas foram:

* Foi utilizado apenas um componente, para que eu tivesse mais controle do codigo em menos tempo.
* Não foram feitos testes automatizados.
* Não foram adicionadas animações para melhorar a experiencia de uso.
