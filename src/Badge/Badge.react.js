/* eslint-disable import/no-unresolved, import/extensions */
import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  /**
   * The badge will be added relativelty to this node
   */
  children: PropTypes.node,
  /**
   * This is the content rendered within the badge
   */
  text: PropTypes.string,
  /**
   * When the icon is set, the content will be <Icon name={icon} /> element
   */
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      size: PropTypes.number,
    }),
  ]),
  /**
   * Just sugar for style={{ container: { width: size, height: size, borderRadius: size / 2 }}}
   */
  size: PropTypes.number,
  /**
   * You can specify stroke for badge. Note that if you use stroke it swaps container and
   * strokeContainer. So if you override styles of container you probably need to override
   * strokeContainer instead the container. Because if you use stroke then the strokeContainer
   * will be wrapper of whole badge component.
   */
  stroke: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.shape({
      container: ViewPropTypes.style,
      strokeContainer: ViewPropTypes.style,
      content: Text.propTypes.style, // eslint-disable-line
    }),
    PropTypes.array,
  ]),
};
const defaultProps = {
  children: null,
  text: null,
  icon: null,
  size: 16,
  stroke: null,
  style: {
    container: {
      top: -8,
      right: -8,
    },
  },
};

function getStyles(props) {
  const { accent, size, stroke, theme } = props;
  const { badge, palette } = theme;

  const local = {
    container: {},
    strokeContainer: {},
  };

  if (size && stroke) {
    const strokeSize = size;
    const contentSize = size - stroke;

    local.strokeContainer.width = strokeSize;
    local.strokeContainer.height = strokeSize;
    local.strokeContainer.borderRadius = strokeSize / 2;

    local.container.position = null;
    local.container.width = contentSize;
    local.container.height = contentSize;
    local.container.borderRadius = contentSize / 2;
  } else if (size && !stroke) {
    local.container.width = size;
    local.container.height = size;
    local.container.borderRadius = size / 2;
  }

  if (accent) {
    local.container.backgroundColor = palette.accentColor;
  }

  return {
    container: [badge.container, local.container, props.style.container],
    strokeContainer: [
      badge.strokeContainer,
      local.strokeContainer,
      props.style.strokeContainer,
    ],
    content: [badge.content, local.content, props.style.content],
  };
}
const mapIconProps = ({ icon, size }) => {
  let iconProps = {};

  if (typeof icon === 'string') {
    iconProps.name = icon;
  } else {
    iconProps = icon;
  }

  if (!iconProps.size && size) {
    iconProps.size = size / 2;
  }

  return iconProps;
};

class Badge extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.renderContent = this.renderContent.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  renderContent(styles) {
    const { text, icon, stroke } = this.props;

    let content = null;

    if (icon) {
      const iconProps = mapIconProps(this.props);
      content = <Icon {...iconProps} />;
    } else if (text) {
      content = <Text style={styles.content}>{text}</Text>;
    }

    const contentWrapper = <View style={styles.container}>{content}</View>;

    if (!stroke) {
      return contentWrapper;
    }

    return <View style={styles.strokeContainer}>{contentWrapper}</View>;
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return children;
  }

  render() {
    const styles = getStyles(this.props);

    return (
      <View style={{ flexDirection: 'row' }}>
        {this.renderChildren()}
        {this.renderContent(styles)}
      </View>
    );
  }
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default withTheme(Badge);
