import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { exception } from "console";
import questionService from "../services/questionService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('ReadQuestion HTTP trigger function processed a request.');
  let response;

  var id = context.bindingData.id;
  try {
    let question;
    if (questionService === undefined) {
      throw new exception("question service is undefined");
    }

    if (id === undefined) {
      question = await questionService.readAll();
    }
    else {
      question = await questionService.readOne(String(id));
    }

    response = { body: question, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};

export default httpTrigger;