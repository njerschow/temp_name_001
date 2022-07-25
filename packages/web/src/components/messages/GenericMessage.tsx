import { TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useState } from 'react'
import { HttpJsonSchemaOrgDraft04Schema } from '../../types/HttpJsonSchemaOrgDraft04Schema'

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
      return ''
    case 'number':
      return 0
    case 'integer':
      return 0
    case 'boolean':
      return true
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
        value={getValueFromPath(safeConcatPaths(propPath, propKey))}
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
    </div>
  )
}

export default GenericMessage
