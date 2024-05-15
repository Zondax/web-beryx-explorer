import axios from 'axios'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { captureException } from '@sentry/nextjs'

/**
 * Interface for Article props
 */
interface ArticleProps {
  /** String containing the URL from where the article content will be fetched */
  content: string
}

/**
 * Article component is a React component that fetches and displays an MDX content from a specific URL.
 */
const Article = ({ content }: ArticleProps) => {
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  /**
   * Memoized function to create a styled image component
   * @returns A React component with specific layout and quality settings
   */
  const SpecialImage = useMemo(() => {
    /**
     * Function to create a SpecialImage component
     * @param props The properties of the component, including src
     * @returns A React component with specific layout and quality settings
     */
    const SpecialImageComponent = (props: React.ComponentPropsWithoutRef<'img'>) => {
      if (!props.src) {
        return null
      }

      const imageName = props.src.split('/').pop()
      const imagePath = `/docs/en/assets/${imageName}`
      return (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            height: 0,
            marginTop: '2rem',
            marginBottom: '2rem',
            overflow: 'hidden',
            borderRadius: '16px',
          }}
        >
          <Image
            src={imagePath}
            fill
            alt={props.alt ?? 'explanatory image'}
            quality={75}
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      )
    }
    return SpecialImageComponent
  }, [])

  /**
   * Memoized function to create a styled blockquote component
   * @returns A React component styled as a blockquote
   */
  const StyledBlockquote = useMemo(() => {
    /**
     * Function to create a styled blockquote component
     * @param props The properties of the component, including children
     * @returns A React component styled as a blockquote
     */
    const StyledBlockquoteComponent = (props: React.ComponentPropsWithoutRef<'blockquote'>) => {
      return (
        <Box
          sx={{
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            px: 2,
            pt: 2,
            pb: 1,
            my: 2,
            mx: 4,
            backgroundColor: 'background.level2',
            color: 'text.primary',
          }}
        >
          {props.children}
        </Box>
      )
    }
    return StyledBlockquoteComponent
  }, [])

  /**
   * The components constant is a memoized object that contains the custom components to be used by the MDXRemote component.
   * Each key in the object corresponds to a standard HTML element and the value is a React component that will be used instead of the standard HTML element.
   * For example, the key 'h1' corresponds to the HTML element <h1> and the value is a custom React component that will be used instead of the standard <h1> element.
   */
  const components = useMemo(
    () => ({
      h1: (props: React.ComponentPropsWithoutRef<'h1'>) => (
        <Typography variant={'h2'} component={'h1'} {...props} sx={{ mb: '1.5rem', mt: '1.25rem' }}>
          {props.children}
        </Typography>
      ),
      h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
        <Typography variant={'h3'} component={'h2'} {...props} sx={{ mb: '0.5rem', mt: '2.5rem' }}>
          {props.children}
        </Typography>
      ),
      h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
        <Typography variant={'h4'} component={'h3'} {...props} sx={{ mb: '0.5rem', mt: '2rem' }}>
          {props.children}
        </Typography>
      ),
      h4: (props: React.ComponentPropsWithoutRef<'h4'>) => (
        <Typography variant={'h5'} component={'h4'} {...props} sx={{ mb: '0.5rem', mt: '2rem' }}>
          {props.children}
        </Typography>
      ),
      h5: (props: React.ComponentPropsWithoutRef<'h5'>) => (
        <Typography variant={'h5'} component={'h5'} {...props} sx={{ mb: '0.5rem', mt: '2rem' }}>
          {props.children}
        </Typography>
      ),
      h6: (props: React.ComponentPropsWithoutRef<'h6'>) => (
        <Typography variant={'h6'} component={'h6'} {...props} sx={{ mb: '0.5rem', mt: '2rem' }}>
          {props.children}
        </Typography>
      ),
      p: (props: React.ComponentPropsWithoutRef<'p'>) => (
        <Typography variant={'body1'} component={'p'} {...props} sx={{ mb: '1rem' }}>
          {props.children}
        </Typography>
      ),
      a: (props: React.ComponentPropsWithoutRef<'a'>) => <Link {...props}>{props.children}</Link>,
      img: (props: React.ComponentPropsWithoutRef<'img'>) => <SpecialImage {...props} />,
      li: (props: React.ComponentPropsWithoutRef<'li'>) => (
        <li {...props} style={{ marginBottom: '0.125rem' }}>
          {props.children}
        </li>
      ),
      blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => <StyledBlockquote {...props}>{props.children}</StyledBlockquote>,
      strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
        <Typography
          variant="inherit"
          color="text.primary"
          sx={{ fontWeight: 'bold', color: theme => `${theme.palette.text.primary}CC`, display: 'inline' }}
          {...props}
        >
          {props.children}
        </Typography>
      ),
      code: (props: React.ComponentPropsWithoutRef<'code'>) => (
        <Typography
          variant={'captionMono'}
          component={'code'}
          {...props}
          sx={{
            display: 'inline-block',
            color: theme => theme.palette.text.primary,
            backgroundColor: theme => theme.palette.background.level3,
            padding: '3px 4px',
            borderRadius: '3px',
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          {props.children}
        </Typography>
      ),
    }),
    [SpecialImage, StyledBlockquote]
  )

  /**
   * Fetches the contents of an article from the URL and catches any error occurred during the process.
   */
  useEffect(() => {
    /**
     * Asynchronous function to fetch the data from the provided URL.
     * In case of any error during the process, it captures the exception and sets the file content to 'Could not load article'.
     */
    const fetchData = async () => {
      // FIXME: This should happen at build time
      try {
        const res = await axios.get(content)
        setFileContent(res.data)
        setLoading(false)
      } catch (e) {
        captureException(e)
        setFileContent('Could not load article')
        setLoading(false)
      }
    }

    fetchData()
  }, [content])

  /**
   * Converts the fetched file content into MDX source and handles any errors occurred during the process.
   */
  useEffect(() => {
    /**
     * Asynchronous function to fetch the MDX content.
     * If the file content exists, it tries to parse the content into MDX source and sets the MDX source.
     * In case of any error during the process, it captures the exception.
     */
    const fetchMDXContent = async () => {
      if (fileContent) {
        try {
          const source = await parseMDXContent(fileContent)
          setMdxSource(source)
        } catch (error) {
          captureException(error)
        }
      }
    }

    fetchMDXContent()
  }, [fileContent])

  /**
   * Converts the fetched file content into MDX source.
   *
   * @param content - The raw content that will be converted into MDX source.
   * @returns The MDX source or an error if any occurred during the process.
   */
  async function parseMDXContent(content: string) {
    return await serialize(content, {
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      },
    })
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '90%',
        }}
      >
        <CircularProgress size={'2rem'} />
      </Box>
    )
  }

  if (!mdxSource) {
    return null
  }

  return <MDXRemote {...mdxSource} components={components} />
}

export default Article
