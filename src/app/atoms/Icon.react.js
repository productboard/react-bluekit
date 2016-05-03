/* eslint-disable */
// Generated by gulp svg-icon - do not modify manually


import React, {Component} from 'react';

const iconList = [
  'eye-hidden',
]


export default class Icon extends Component {

  static propTypes = {
    color: React.PropTypes.string,
    height: React.PropTypes.number,
    kind: React.PropTypes.oneOf(iconList).isRequired,
    onClick: React.PropTypes.func,
    preview: React.PropTypes.bool,
    size: React.PropTypes.number,
    style: React.PropTypes.oneOf([
      React.PropTypes.arrayOf(React.PropTypes.object),
      React.PropTypes.object
    ]),
    width: React.PropTypes.number,
    wrapperStyle: React.PropTypes.oneOf([
      React.PropTypes.arrayOf(React.PropTypes.object),
      React.PropTypes.object
    ])
  };

  static defaultProps = {
    color: '#000',
    size: 32
  }

  render() {
    const {preview} = this.props

    return preview ?
      this.renderPreview() :
      this.renderIcon()
  }

  renderIcon() {
    const {kind, wrapperStyle} = this.props;

    if (wrapperStyle)
      return <div style={wrapperStyle}>{this.getIcon(kind)}</div>

    return this.getIcon(kind)
  }

  renderPreview() {
    return (
      <div>
        {iconList.map(kind => this.renderPreviewKind(kind))}
      </div>
    )
  }

  renderPreviewKind(kind) {
    return (
      <div key={kind}>
        <h3>&lt;Icon kind="{kind}" /&gt;</h3>
        {this.renderIcon(kind)}
      </div>
    )
  }

  getIcon(kind) {
    const {color, height, onClick, size, style, width} = this.props;

    switch (kind) {
      default: return null;
      case ('eye-hidden'): return (<svg xmlns="http://www.w3.org/2000/svg" fill={color} height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 512 512"><path d="M88.443 336.543l38.4-23.817c-25.379-18.308-48.149-40.619-67.288-64.259 24.524-27.926 94.447-95.454 197.044-95.454 33.79 0 66.001 7.26 95.548 19.969l42.392-26.293c-41.833-22.926-88.859-36.019-137.94-36.019-100.23 0-191.777 55.78-249.788 137.096 22.491 32.967 50.2 63.644 81.632 88.777z"/><path d="M258.717 213.079a30.174 30.174 0 0 1 7.705 13.072l50.065-31.052c-15.04-14.252-35.338-23.011-57.693-23.011-46.344 0-83.912 37.568-83.912 83.911a83.864 83.864 0 0 0 3.685 24.645l38.252-23.727c-.336-.308-.669-.62-.995-.945-11.845-11.845-11.845-31.049 0-42.893 11.846-11.845 31.048-11.845 42.893 0zM431.536 170.509l-39.02 24.202c23.014 15.057 43.671 33.509 61.272 54.218-22.484 30.581-91.133 110.058-197.19 110.058-32.112 0-63.066-8.695-91.733-23.076l-41.079 25.479c40.563 24.771 85.683 39.941 132.812 39.941 103.83 0 195.211-65.117 248.593-154.082-20.336-29.536-45.312-55.552-73.655-76.74z"/><path d="M258.794 339.91c46.344 0 83.913-37.567 83.913-83.911a83.735 83.735 0 0 0-4.64-27.516L198.932 314.78c15.226 15.504 36.416 25.13 59.862 25.13zM503.548 104.562l-1.884-3.038c-2.511-4.049-6.976-6.466-11.94-6.466-2.849 0-5.66.81-8.132 2.342L13.677 387.622c-3.395 2.105-5.803 5.338-6.782 9.102-.97 3.728-.417 7.532 1.557 10.712l1.884 3.039c2.512 4.05 6.977 6.468 11.943 6.468h.001c2.847 0 5.657-.81 8.127-2.342l467.917-290.224c6.974-4.327 9.317-13.216 5.224-19.815z"/></svg>);
      }
  }
}


