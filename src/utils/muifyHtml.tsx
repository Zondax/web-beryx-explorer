import HTMLReactParser, { DOMNode, HTMLReactParserOptions, domToReact } from 'html-react-parser'
import DOMPurify from 'isomorphic-dompurify'
import Image from 'next/image'

import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { captureException } from '@sentry/nextjs'

/**
 * @description This object contains a 'replace' function that replaces certain HTML elements with their corresponding React components.
 * @type {HTMLReactParserOptions}
 */
const htmlToReactOptions: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if ('children' in domNode) {
      switch (domNode.name) {
        case 'ul': {
          return (
            <ul>
              <Grid container spacing={'0.5rem'} sx={{ marginTop: 1 }}>
                {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
              </Grid>
            </ul>
          )
        }
        case 'ol': {
          return (
            <ol>
              <Grid container spacing={'0.5rem'} sx={{ marginTop: 1 }}>
                {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
              </Grid>
            </ol>
          )
        }
        case 'li': {
          return (
            <Grid xs={12}>
              <li>
                <Typography variant="body1" component={'p'}>
                  {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
                </Typography>
              </li>
            </Grid>
          )
        }
        case 'h1': {
          return (
            <Typography variant={'h3'} color={'text.primary'} fontWeight={700} gutterBottom>
              {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
            </Typography>
          )
        }
        case 'h2': {
          return (
            <Typography variant={'h4'} color={'text.primary'} fontWeight={700} gutterBottom>
              {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
            </Typography>
          )
        }
        case 'h5': {
          return (
            <Typography variant={'h5'} fontWeight={700} gutterBottom>
              {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
            </Typography>
          )
        }
        case 'strong': {
          return (
            <Typography variant={'inherit'} component={'span'} color={'text.primary'} fontWeight={700}>
              {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
            </Typography>
          )
        }
        case 'a': {
          return (
            <a href={domNode.attribs.href} target={'_blank'} rel="noreferrer" style={{ color: '#4967D4' }}>
              {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
            </a>
          )
        }
        case 'blockquote': {
          return (
            <Typography variant={'body1'} fontStyle={'italic'} gutterBottom>
              {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
            </Typography>
          )
        }
        case 'img': {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 0',
              }}
            >
              <Image
                src={domNode.attribs.src}
                alt={domNode.attribs.alt}
                width={16}
                height={9}
                sizes="50vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
              <Typography variant="caption" fontStyle={'italic'} color={'text.secondary'}>
                {domNode.attribs.alt}
              </Typography>
            </Box>
          )
        }
        default: {
          captureException(new Error(`Unhandled HTML element: ${domNode.name}`))
          return null
        }
      }
    }
    return null
  },
}

/**
 * @description This function sanitizes the input HTML and then parses it into React components using the 'htmlToReactOptions' object.
 * @param input - The input HTML to be sanitized and parsed.
 * @returns - The parsed React components.
 */
export function muifyHtml(input: string) {
  const purified = DOMPurify.sanitize(input)
  return HTMLReactParser(purified, htmlToReactOptions)
}
