
export type SendEmailDto = {
    from: string,
    recipient: string,
    subject: string,
    html: string,
    text?: string,
    placeholderReplacement?: Record<string, string> 
}