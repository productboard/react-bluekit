import Checkbox from '../atoms/Checkbox.react';
import Component from 'react-pure-render/component';
import HtmlEditor from '../atoms/HtmlEditor.react';
import JsonEditor from '../atoms/JsonEditor.react';
import font from '../styles/Font';
import Input from '../atoms/Input.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import Select from '../atoms/Select.react';
import spaces from '../styles/Spaces';
import {OrderedMap, Map, fromJS} from 'immutable';
import * as colors from '../styles/Colors';

@Radium
export default class PropsTable extends Component {

  static contextTypes = {
    createSetAtomProp: RPT.func.isRequired
  }

  static propTypes = {
    activeProps: RPT.any,
    atom: RPT.object.isRequired,
    commonStyles: RPT.object.isRequired,
    componentProps: RPT.object.isRequired,
    handlePropsNameClick: RPT.func.isRequired,
    triggeredProps: RPT.object
  }

  render() {
    const {atom} = this.props
    const propsDefinition = atom.get('propsDefinition').toJS()

    if (Object.keys(propsDefinition).length === 0)
      return <div style={styles.prop.noProps}>No props defined</div>

    const sortedProps = Object.keys(propsDefinition)
      .sort()
      .reduce((acc, k) => acc.set(k, propsDefinition[k]), new OrderedMap())

    return (
      <div style={font}>
        {sortedProps.map((value, key) => this.renderProp(value, key, true))}
        {sortedProps.map((value, key) => this.renderProp(value, key, false))}
      </div>
    )
  }

  renderProp(data, key, renderRequired) {
    if (!data.type) return null

    const required = data.required

    if ((renderRequired && !required) || (!renderRequired && required))
      return null

    return this.renderPropTableRow(data, key, renderRequired, [])
  }

  renderPropTableRow(data, key, renderRequired, scope) {
    const {activeProps, commonStyles, triggeredProps} = this.props

    if (!data.type) return null

    if (data.type.name === 'shape')
      return (
        Map(data.type.value).map((v, k) => this.renderPropTableRow({type: v}, k, renderRequired, [key]))
      )

    const required = data.required
    const triggered = triggeredProps.includes(key)
    const fullWidth = ['any', 'array', 'arrayOf', 'element', 'enum', 'node', 'object', 'shape', 'string'].indexOf(data.type.name) !== -1
    return (
      <div key={key}>
        <div style={styles.row}>
          <div
            style={[
              styles.prop,
              styles.prop.name,
              fullWidth && styles.prop.fullWidth, styles.prop.fullWidth.name,
              required && styles.prop.required,
              activeProps === key && commonStyles.propName.active
            ]}
          >
            {this.renderNameOfProp(scope.concat(key).join('.'), data.type.name)}
            {required && '*'}
            <small style={styles.prop.small}>{data.type.name}</small>
          </div>
          <div
            style={[
              styles.prop,
              styles.prop.value,
              fullWidth && styles.prop.fullWidth,
              triggered && {backgroundColor: colors.GRAY_BRIGHT}]}
          >
            {data.type.name === 'func'
              ? 'func()'
              : this.renderValueSelection(key, data.type, scope)
            }
          </div>
        </div>
        <div styles={styles.clearfix} />
      </div>
    )
  }

  renderNameOfProp(name, kind) {
    const {handlePropsNameClick} = this.props

    if (['string', 'number', 'bool', 'enum'].indexOf(kind) === -1)
      return name
    else
      return (
        <a
          href={`#${name}-variant`}
          onClick={() => handlePropsNameClick(name)}
          style={styles.prop.value.link}
        >
          {name}
        </a>
      )
  }

  renderValueSelection(key, type, scope = []) {
    const {atom, componentProps} = this.props
    const {createSetAtomProp} = this.context
    const name = `${atom.get('name')}-${scope.concat(key).join('-')}`

    const defaultProps = {
      onChange: createSetAtomProp(key, type.name, scope),
      value: fromJS(componentProps).getIn(scope.concat([key]))
    }

    switch (type.name) {
      case 'any': return <Input key={name} type='text' {...defaultProps} />
      case 'array': return <JsonEditor key={name} name={name} {...defaultProps} />
      case 'arrayOf': return <JsonEditor key={name} name={name} {...defaultProps} />
      case 'bool': return <Checkbox key={name} {...{...defaultProps, checked: defaultProps.value, name: key}} />
      case 'element': return <HtmlEditor key={name} name={name} {...defaultProps} />
      case 'enum' : return this.renderEnum(name, type, defaultProps)
      case 'node': return <HtmlEditor key={name} name={name} {...defaultProps} />
      case 'number': return <Input key={name} type='number' {...defaultProps} />
      case 'object': return <JsonEditor key={name} name={name} {...defaultProps} />
      case 'shape': return <JsonEditor key={name} name={name} {...defaultProps} />
      case 'string': return <Input key={name} type='text' {...defaultProps} />
    }
  }

  renderEnum(name, type, defaultProps) {
    if (typeof type.value === 'object')
      return <Select key={name} options={this.selectOptions(type)} {...defaultProps} />

    return <Input key={name} type='text' {...defaultProps} />
  }

  selectOptions(type) {
    const options = type.value
      .map(v => <option value={v.value.replace(/'/g, '')}>{v.value.replace(/'/g, '')}</option>)

    if (!type.required)
      return [<option value=''></option>].concat(options)

    return options
  }
}

const styles = {
  clearfix: {
    clear: 'both'
  },

  row: {
    paddingBottom: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'none'
  },

  prop: {
    float: 'left',
    boxSizing: 'border-box',
    name: {
      ...font.size.small,
      width: '55%',
      color: colors.BLUE,
      wordBreak: 'break-all',
      borderLeft: '5px solid transparent',
      padding: `0 ${spaces.small} 0 ${spaces.smaller}`,
      transition: 'all .2s ease-out',
      active: {
        borderLeft: `5px solid ${colors.BLUE}`
      }
    },
    value: {
      ...font.size.small,
      width: '45%',
      color: colors.BLACK_BRIGHT,
      padding: `0 ${spaces.normal} 0 ${spaces.small}`,
      link: {
        color: colors.BLUE
      }
    },
    small: {
      fontWeight: 'normal',
      fontSize: '95%',
      display: 'block',
      color: colors.BLACK_BRIGHT
    },
    fullWidth: {
      width: '100%',
      padding: `0 ${spaces.normal}`,
      name: {
        padding: `0 ${spaces.normal} 2px 15px`
      }
    },
    required: {
      fontWeight: 'bold'
    },
    noProps: {
      ...font,
      ...font.bold,
      padding: `8px ${spaces.normal}`
    }
  }
}
