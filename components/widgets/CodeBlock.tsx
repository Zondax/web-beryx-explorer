import { useEffect, useMemo, useRef, useState } from 'react'
import { monaco } from 'react-monaco-editor'

import { ContentTypes, getFormattedBody } from '@/utils/download'
import loader from '@monaco-editor/loader'
import Editor from '@monaco-editor/react'
import { Box, Typography, useTheme } from '@mui/material'
import { captureException } from '@sentry/nextjs'

import { colors } from '../../styles/colors'

/**
 * Typed representation of the properties that the CodeBlock component accepts.
 * @interface
 * @property {any} content - The content to be displayed in the editor
 * @property readOnly - Flag indicating whether the editor should be in read-only mode
 * @property fillResizablePanel - Whether to fill the resizable panel or not
 * @property height - Height of the component
 * @property width - Width of the component
 * @property {ContentTypes} contentType - Type of the content
 * @property {(value: string | undefined, e: monaco.editor.IModelContentChangedEvent) => void} onChange - Function to be executed when the content changes
 * @property noContentText - Text to be displayed when there is no content
 * @property isInput - Flag indicating whether the given content is an input
 * @property {'on' | 'off' | 'wordWrapColumn' | 'bounded'} wordWrap - Word wrap setting for the editor
 * @property dynamicHeight - Whether to change the height of the editor dynamically.
 */
interface CodeBlockProps {
  content?: any
  readOnly: boolean
  fillResizablePanel?: boolean
  height?: string
  width?: string
  contentType?: ContentTypes
  onChange?: (value: string | undefined, e: monaco.editor.IModelContentChangedEvent) => void
  noContentText?: string
  isInput?: boolean
  wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded'
  dynamicHeight?: boolean
}

/** Minimum height for the editor component also used for dynamic height configuration */
const minEditorHeight = 60

/**
 * The CodeBlock component is a React component that is used to render an editable code block on the page.
 * @function
 * @param props - Properties that define how the component should function
 * @returns code block component
 */
const CodeBlock = ({
  content,
  readOnly,
  fillResizablePanel = false,
  height = '15rem',
  width = '100%',
  contentType,
  onChange,
  noContentText = 'No content to display',
  isInput = false,
  wordWrap = 'on',
  dynamicHeight = false,
}: CodeBlockProps) => {
  const theme = useTheme()
  const [editorHeight, setEditorHeight] = useState(dynamicHeight ? minEditorHeight : 0)
  const editorRef = useRef<HTMLDivElement>(null)
  const customHTMLRef = useRef(null)

  if (!theme.extensions) {
    captureException(new Error('Theme extensions are not defined'))
  }

  /**
   * handleEditorSizeChange Resize handler for handling the changing size of the editor
   * Adjusts the size of the editor according to its container.
   */
  const handleEditorSizeChange = () => {
    if (!editorRef || !editorRef.current) {
      return
    }
    setEditorHeight(editorRef?.current.getBoundingClientRect().height)
  }

  /**
   * useEffect hook to set up event subscriptions to handle editor size changes
   * and to perform clean up on component unmounting.
   */
  useEffect(() => {
    window.addEventListener('split', handleEditorSizeChange)
    window.addEventListener('resize', handleEditorSizeChange)
    return () => {
      window.removeEventListener('split', handleEditorSizeChange)
      window.removeEventListener('resize', handleEditorSizeChange)
    }
  }, [])

  /**
   * useEffect hook to call handleEditorSizeChange whenever editorRef changes
   */
  useEffect(() => {
    handleEditorSizeChange()
  }, [editorRef])

  const themes = useMemo(
    () => ({
      'beryx-dark': {
        base: 'vs-dark' as monaco.editor.BuiltinTheme,
        inherit: true,
        rules: [{ token: '123', background: colors.gray850 }],
        colors: {
          'editor.background': '#1F2634',
        },
      },
      'beryx-light': {
        base: 'vs' as monaco.editor.BuiltinTheme,
        inherit: true,
        rules: [{ token: '124', background: colors.gray50 }],
        colors: {
          'editor.background': '#ffffff',
        },
      },
    }),
    []
  )

  /**
   * useEffect hook to initialize monaco editor and define its themes.
   * The themes 'beryx-dark' and 'beryx-light' are defined and the theme used is determined by the current app theme.
   */
  useEffect(() => {
    /**
     * Asynchronously load Monaco editor, define its themes, and set the theme.
     */
    const loadMonaco = async () => {
      const monaco = await loader.init()
      monaco?.editor.defineTheme('beryx-dark', themes['beryx-dark'])
      monaco?.editor.defineTheme('beryx-light', themes['beryx-light'])
      monaco?.editor.setTheme(`beryx-${theme.palette.mode}`)
    }
    loadMonaco()
  }, [themes, theme.palette.mode])

  /**
   * Callback function for the Mount-event of the Editor
   * @function
   * @param editor - the mounted editor instance
   */
  function handleHTMLEditorDidMount(editor: any) {
    const height = (editor.getModel().getLineCount() + 1) * 18
    setEditorHeight(height < minEditorHeight ? minEditorHeight : height)
    customHTMLRef.current = editor
  }

  const editorOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      readOnly,
      wordWrap,
      scrollBeyondLastColumn: 10,
    }),
    [readOnly, wordWrap]
  )

  const editorOrFallback =
    content || isInput ? (
      <Editor
        defaultLanguage={'json'}
        language={contentType ?? 'json'}
        theme={theme.extensions.editor}
        options={editorOptions}
        defaultValue={' '}
        value={isInput ? content : getFormattedBody(content ?? '', contentType ?? 'application/json')}
        onChange={onChange}
        onMount={dynamicHeight ? handleHTMLEditorDidMount : undefined}
      />
    ) : (
      <Typography variant="body1" sx={{ width: 'max-content' }}>
        {noContentText}
      </Typography>
    )

  return (
    <Box
      ref={editorRef}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        bgcolor="background.level1"
        sx={{
          width: fillResizablePanel ? '100%' : width,
          height: fillResizablePanel ? `calc(${editorHeight}px)` : height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          '& > *': {
            borderRadius: fillResizablePanel ? '0' : '6px 6px 6px 6px',
            overflow: 'hidden',
          },
        }}
      >
        {editorOrFallback}
      </Box>
    </Box>
  )
}

export default CodeBlock
