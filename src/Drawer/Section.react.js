/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Subheader from '../Subheader';
import Divider from '../Divider';
import ListItem from '../ListItem';
import { ViewPropTypes } from '../utils';

const propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      label: PropTypes.string,
      onPress: PropTypes.func,
      onLongPress: PropTypes.func,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
    }),
  ),
  divider: PropTypes.bool,
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    item: ViewPropTypes.style,
    subheader: ViewPropTypes.style,
    icon: Text.propTypes.style, // eslint-disable-line
    value: Text.propTypes.style, // eslint-disable-line
    label: Text.propTypes.style, // eslint-disable-line
  }),
  key: PropTypes.string,
};
const defaultProps = {
  title: null,
  items: [],
  divider: false,
  style: {},
  key: '',
};
const contextTypes = {
  uiTheme: PropTypes.object.isRequired, // eslint-disable-line
};

function getStyles(props, context) {
  const { drawerSection } = context.uiTheme;

  return {
    container: [drawerSection.container, props.style.container],
    item: [drawerSection.item, props.style.item],
    subheader: [drawerSection.subheader, props.style.subheader],
    icon: [drawerSection.icon, props.style.icon],
    value: [drawerSection.value, props.style.value],
    label: [drawerSection.label, props.style.label],
  };
}

class Section extends PureComponent {
  renderTitle = () => {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    return <Subheader text={title} />;
  };

  render() {
    const { items, divider, key } = this.props;
    const { uiTheme } = this.context;
    const { typography } = uiTheme;

    const styles = getStyles(this.props, this.context);

    return (
      <View key={key}>
        <View style={styles.container}>
          {this.renderTitle(styles)}
          {items.map(item => {
            let style = { primaryText: typography.buttons };

            if (item.active) {
              style = uiTheme.drawerSectionActiveItem;
            }

            return (
              <ListItem
                dense
                key={item.key ? item.key : item.icon}
                leftElement={item.icon}
                centerElement={item.value}
                onPress={item.onPress}
                style={style}
              />
            );
          })}
        </View>
        {divider && <Divider />}
      </View>
    );
  }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;
Section.contextTypes = contextTypes;

export default Section;
