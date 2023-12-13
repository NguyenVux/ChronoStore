export interface RecogRespone {
    status: string
    photos: RecogPhoto[]
    usage: Usage
    operation_id: string
}

export interface RecogPhoto {
    url: string
    pid: string
    width: number
    height: number
    tags: RecogTag[]
}
export interface RecogTag {
    uids: Uid[]
    attributes: Attributes
    tid: string
    [key:string]:unknown

}

export interface Uid {
    uid: string
    confidence: number
}

export interface Attributes {
    face?:Attribute;
    gender?:Attribute;
    glasses?:Attribute;
    dark_glasses?:Attribute;
    smiling?:Attribute;
}

export interface Attribute {
    value: string
    confidence: number
}

export interface Usage {
    used: number
    remaining: number
    limit: number
    reset_time: number
    reset_time_text: string
}
