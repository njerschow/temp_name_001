import { Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { HttpJsonSchemaOrgDraft04Schema } from '../../types/HttpJsonSchemaOrgDraft04Schema'
import swag from './tmpswagger.json'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const mapping = {
  QueryNumPoolsRequest: '/osmosis/gamm/v1beta1/num_pools',
  QueryPoolParamsRequest: '/osmosis/gamm/v1beta1/pools/{pool_id}/params',
  QueryPoolRequest: '/osmosis/gamm/v1beta1/pools/{pool_id}',
  QueryPoolsRequest: '/osmosis/gamm/v1beta1/pools',
  QuerySpotPriceRequest: '/osmosis/gamm/v1beta1/pools/{pool_id}/prices',
  QuerySwapExactAmountInRequest:
    '/osmosis/gamm/v1beta1/{pool_id}/estimate/swap_exact_amount_in',
  QuerySwapExactAmountOutRequest:
    '/osmosis/gamm/v1beta1/{pool_id}/estimate/swap_exact_amount_out',
  QueryTotalLiquidityRequest: '/osmosis/gamm/v1beta1/total_liquidity',
  QueryTotalPoolLiquidityRequest:
    '/osmosis/gamm/v1beta1/pools/{pool_id}/total_pool_liquidity',
  QueryTotalSharesRequest: '/osmosis/gamm/v1beta1/pools/{pool_id}/total_shares'
}

async function sendRequest (schemaName: string, flattenedMessage: any) {
  const providerURL = 'https://lcd-osmosis.whispernode.com'
  let path = mapping[schemaName]
  const query = {}
  const requestDef = swag.paths[path]
  if (requestDef.get.parameters) {
    for (let param of requestDef.get.parameters) {
      if (param.in === 'path') {
        path = path.replace(`{${param.name}}`, flattenedMessage[param.name])
      } else if (param.in === 'query') {
        query[param.name] = flattenedMessage[param.name]
      }
    }
  }
  console.log(query)
  const response = await axios.get(providerURL + path, {
    params: query
  })
  console.log(response.data)
  return response.data
}

const useStyles = makeStyles({
  root: {},
  subProp: {
    paddingLeft: 8,
    borderLeft: '1px solid #678'
  },
  primitiveProp: {}
})

function constructStateFromObjectSchema (
  rootSchema: HttpJsonSchemaOrgDraft04Schema,
  schema: HttpJsonSchemaOrgDraft04Schema,
  propKey?: string
) {
  const state = {}
  for (const key in schema.properties) {
    const property = schema.properties[key]
    state[key] = constructStateFromSchema(rootSchema, property)
  }
  return state
}

function constructStateFromSchema (
  rootSchema: HttpJsonSchemaOrgDraft04Schema,
  schema: HttpJsonSchemaOrgDraft04Schema,
  propKey?: string
) {
  if (schema['$ref']) {
    const propKey = schema['$ref'].replace('#/definitions/', '')
    return constructStateFromSchema(
      rootSchema,
      rootSchema.definitions[propKey],
      propKey
    )
  }

  switch (schema.type) {
    case 'string':
    case 'number':
    case 'integer':
    case 'boolean':
      return null
    case 'object':
      return constructStateFromObjectSchema(rootSchema, schema, propKey)
    case 'array':
      return []
    default:
      throw new Error('Unsupported type: ' + schema.type)
  }
}

const GenericMessage = ({
  schemaName,
  msgSchema
}: {
  schemaName: string
  msgSchema: HttpJsonSchemaOrgDraft04Schema
}) => {
  const classes = useStyles()

  const [message, setMessage] = useState({
    [schemaName]: constructStateFromSchema(msgSchema, msgSchema)
  })
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  console.log({ message, flat: flattenObject(message) })

  // DELETABLE - REFACTOR asap
  function flattenObject (obj: any) {
    if (!obj) return
    if (obj.hasOwnProperty(schemaName)) {
      obj = obj[schemaName]
    }
    const result: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]
        if (typeof value === 'object') {
          const flat = flattenObject(value)
          for (const k in flat) {
            if (flat.hasOwnProperty(k)) {
              result[`${key}.${k}`] = flat[k]
            }
          }
        } else {
          result[key] = value
        }
      }
    }
    return result
  }

  async function sendMessage () {
    setResponse(null)
    setError(null)
    try {
      const res = await sendRequest(schemaName, flattenObject(message))
      setResponse(res)
    } catch (e) {
      setError(
        e.response
          ? e.response.data?.message
            ? e.response.data.message
            : JSON.stringify(e.response.data, null, 2)
          : e.message
      )
    }
  }

  // yucky function to read values
  function getValueFromPath (path: string) {
    const parts = path.split('.')
    let value = message
    for (const part of parts) {
      value = value[part]
    }
    return value
  }

  // yucky function to set values
  function setValueAtPath (path: string, value: any) {
    const parts = path.split('.')
    const length = parts.length
    const lastPart = parts[length - 1]

    // deep copy (ew)
    let messageRef = JSON.parse(JSON.stringify(message))
    let seeker = messageRef
    for (const part of parts.slice(0, length - 1)) {
      seeker = seeker[part]
    }

    seeker[lastPart] = value
    setMessage(messageRef)
  }

  function safeConcatPaths (propPath: string, propKey: string) {
    return propPath ? propPath + '.' + propKey : propKey
  }

  function wrapInPropContainer (
    definition: HttpJsonSchemaOrgDraft04Schema,
    children: any,
    propKey?: string,
    isPrimitive: boolean = false
  ) {
    return (
      <div className={isPrimitive ? classes.primitiveProp : classes.subProp}>
        {isPrimitive ? (
          <Typography
            variant='body2'
            className='main-text'
            style={{ fontWeight: '200 !important' }}
          >
            {propKey || definition.title}
          </Typography>
        ) : (
          <Typography variant='body1' className='main-text'>
            {propKey || definition.title}
          </Typography>
        )}
        {definition.description && (
          <Typography
            variant='body2'
            className='detail-text'
            style={{ fontSize: 12, opacity: 0.6 }}
          >
            {definition.description}
          </Typography>
        )}
        {children}
      </div>
    )
  }

  function renderObjectPropEditor (
    definition: HttpJsonSchemaOrgDraft04Schema,
    propPath: string,
    propKey?: string
  ) {
    const children = []
    for (const propName in definition.properties) {
      const property = definition.properties[propName]
      children.push(
        <div className={classes.subProp} key={definition.title + propName}>
          {renderPropertyEditor(
            property,
            safeConcatPaths(propPath, propKey),
            propName
          )}
        </div>
      )
    }

    return wrapInPropContainer(definition, children, propKey)
  }

  function renderArrayPropEditor (
    definition: HttpJsonSchemaOrgDraft04Schema,
    propPath: string,
    propKey?: string
  ) {}

  function renderStringPropEditor (
    definition: HttpJsonSchemaOrgDraft04Schema,
    propPath: string,
    propKey?: string
  ) {
    return wrapInPropContainer(
      definition,
      <TextField
        InputProps={{
          style: { padding: 0, color: '#222222' },
          classes: {
            input: 'input',
            notchedOutline: 'notched-outline',
            focused: 'input-focused'
          }
        }}
        placeholder={('type: ' + definition.type) as string}
        value={getValueFromPath(safeConcatPaths(propPath, propKey)) || ''}
        onChange={e =>
          setValueAtPath(
            safeConcatPaths(propPath, propKey),
            e.currentTarget.value
          )
        }
      />,
      propKey,
      true
    )
  }

  function renderPropertyEditor (
    definition: HttpJsonSchemaOrgDraft04Schema,
    propPath: string,
    propKey?: string
  ) {
    // console.log(
    //   definition['$ref'],
    //   definition.title,
    //   definition.type,
    //   definition.properties
    // )
    if (definition['$ref']) {
      const defKey = definition['$ref'].replace('#/definitions/', '')
      return renderPropertyEditor(
        msgSchema.definitions[defKey],
        propPath,
        propKey
      )
    }
    switch (definition.type) {
      case 'object':
        return renderObjectPropEditor(definition, propPath, propKey)
      case 'string':
        return renderStringPropEditor(definition, propPath, propKey)
      case 'number':
      case 'integer':
      case 'boolean':
      case 'array':
      default:
        return <p>Unimplemented property type {definition.type}</p>
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant='h6' className='main-text'>
        {schemaName}
      </Typography>
      {msgSchema.description && (
        <Typography
          variant='body1'
          className='detail-text'
          style={{ fontSize: 14, opacity: 0.6 }}
        >
          {msgSchema.description}
        </Typography>
      )}
      {renderPropertyEditor(msgSchema, '', schemaName)}
      <Button onClick={sendMessage} className='action-button small'>
        Send Request
      </Button>
      {!!response && typeof document !== 'undefined' && (
        <DynamicReactJson src={response} theme='shapeshifter' collapsed={1} />
      )}
      {error && (
        <Typography variant='body1' className='error-text'>
          {error}
        </Typography>
      )}
    </div>
  )
}

export default GenericMessage
