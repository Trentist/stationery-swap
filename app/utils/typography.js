// typography.js

import React from 'react'
import { Text, Platform, Button, StyleSheet } from 'react-native'

export const typography = () => {
  const oldTextRender = Text.render
  Text.render = function(...args) {
    const origin = oldTextRender.call(this, ...args)
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    })
  }
  const oldButtonRender = Button.render
  Button.render = function(...args) {
    const origin = oldButtonRender.call(this, ...args)
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    })
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'SF-Pro'
  }
});