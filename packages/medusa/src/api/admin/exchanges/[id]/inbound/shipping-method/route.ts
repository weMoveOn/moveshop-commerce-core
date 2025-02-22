import { createExchangeShippingMethodWorkflow } from "@medusajs/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/utils"

import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "../../../../../../types/routing"
import { defaultAdminDetailsReturnFields } from "../../../../returns/query-config"
import { AdminPostReturnsShippingReqSchemaType } from "../../../../returns/validators"
import { HttpTypes } from "@medusajs/types"

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminPostReturnsShippingReqSchemaType>,
  res: MedusaResponse<HttpTypes.AdminExchangeReturnResponse>
) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const [exchange] = await remoteQuery(
    remoteQueryObjectFromString({
      entryPoint: "order_exchange",
      variables: {
        id,
      },
      fields: ["return_id"],
    }),
    {
      throwIfKeyNotFound: true,
    }
  )

  const { result } = await createExchangeShippingMethodWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      return_id: exchange.return_id,
      exchange_id: id,
    },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "return",
    variables: {
      id: exchange.return_id,
    },
    fields: defaultAdminDetailsReturnFields,
  })

  const [orderReturn] = await remoteQuery(queryObject)

  res.json({
    order_preview: result,
    return: orderReturn,
  })
}
