const theme = {
  button: {
    defaultProps: {
      color: 'primary'
    },
    valid: {
      colors: ['primary']
    },
    styles: {
      variants: {
        filled: {
          primary: {
            background: 'bg-primary',
            color: 'text-white'
          }
        },
        outlined: {
          primary: {
            border: 'border border-primary',
            color: 'text-primary'
          }
        },
        gradient: {
          primary: {
            background: 'bg-primary',
            color: 'text-white'
          }
        },
        text: {
          primary: {
            color: 'text-primary'
          }
        }
      }
    }
  },
  input: {
    defaultProps: {
      size: 'lg',
      color: 'blue',
      variant: 'standard'
    },
    styles: {
      base: {
        input: {
          fontSize: '!text-base'
        },
        label: {
          lineHeight: 'leading-tight peer-focus:leading-tight'
        },
        container: {
          minWidth: 'min-w-[150px]'
        }
      }
    }
  },
  textarea: {
    defaultProps: {
      size: 'lg',
      color: 'blue',
      variant: 'standard'
    },
    styles: {
      base: {
        textarea: {
          fontSize: '!text-base !min-h-fit'
        }
      }
    }
  },
  checkbox: {
    defaultProps: {
      size: 'lg',
      color: 'blue',
      variant: 'standard'
    }
  },
  select: {
    defaultProps: {
      size: 'lg',
      color: 'blue',
      variant: 'standard'
    },
    styles: {
      base: {
        option: {
          active: {
            fontSize: '!text-base'
          }
        }
      }
    }
  }
}

export { theme }
