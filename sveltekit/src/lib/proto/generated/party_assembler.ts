// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "party_assembler.proto" (syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message PartyAssemblerProto
 */
export interface PartyAssemblerProto {
    /**
     * @generated from protobuf field: repeated PartyAssemblerProto.InputDeck input_decks_1 = 1;
     */
    inputDecks1: PartyAssemblerProto_InputDeck[];
    /**
     * @generated from protobuf field: repeated PartyAssemblerProto.InputDeck input_decks_2 = 2;
     */
    inputDecks2: PartyAssemblerProto_InputDeck[];
    /**
     * @generated from protobuf field: repeated PartyAssemblerProto.InputDeck input_decks_3 = 3;
     */
    inputDecks3: PartyAssemblerProto_InputDeck[];
    /**
     * @generated from protobuf field: repeated PartyAssemblerProto.InputDeck input_decks_4 = 4;
     */
    inputDecks4: PartyAssemblerProto_InputDeck[];
    /**
     * @generated from protobuf field: repeated PartyAssemblerProto.PickedAssembly picked_assembly = 5;
     */
    pickedAssembly: PartyAssemblerProto_PickedAssembly[];
    /**
     * @generated from protobuf field: repeated PartyAssemblerProto.UserPatch user_patches = 6;
     */
    userPatches: PartyAssemblerProto_UserPatch[];
    /**
     * @generated from protobuf field: bool advanced = 7;
     */
    advanced: boolean;
}
/**
 * @generated from protobuf message PartyAssemblerProto.InputDeck
 */
export interface PartyAssemblerProto_InputDeck {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: bool published = 2;
     */
    published: boolean;
}
/**
 * @generated from protobuf message PartyAssemblerProto.PickedAssembly
 */
export interface PartyAssemblerProto_PickedAssembly {
    /**
     * @generated from protobuf field: repeated PartyAssemblerProto.PickedAssembly.Deck decks = 1;
     */
    decks: PartyAssemblerProto_PickedAssembly_Deck[];
}
/**
 * @generated from protobuf message PartyAssemblerProto.PickedAssembly.Deck
 */
export interface PartyAssemblerProto_PickedAssembly_Deck {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: string rename = 2;
     */
    rename: string;
    /**
     * @generated from protobuf field: repeated string patch_adds = 3;
     */
    patchAdds: string[];
    /**
     * @generated from protobuf field: repeated string patch_removes = 4;
     */
    patchRemoves: string[];
    /**
     * @generated from protobuf field: string comments = 5;
     */
    comments: string;
}
/**
 * @generated from protobuf message PartyAssemblerProto.UserPatch
 */
export interface PartyAssemblerProto_UserPatch {
    /**
     * @generated from protobuf field: int32 id = 1;
     */
    id: number;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string url = 3;
     */
    url: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class PartyAssemblerProto$Type extends MessageType<PartyAssemblerProto> {
    constructor() {
        super("PartyAssemblerProto", [
            { no: 1, name: "input_decks_1", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PartyAssemblerProto_InputDeck },
            { no: 2, name: "input_decks_2", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PartyAssemblerProto_InputDeck },
            { no: 3, name: "input_decks_3", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PartyAssemblerProto_InputDeck },
            { no: 4, name: "input_decks_4", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PartyAssemblerProto_InputDeck },
            { no: 5, name: "picked_assembly", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PartyAssemblerProto_PickedAssembly },
            { no: 6, name: "user_patches", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PartyAssemblerProto_UserPatch },
            { no: 7, name: "advanced", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<PartyAssemblerProto>): PartyAssemblerProto {
        const message = { inputDecks1: [], inputDecks2: [], inputDecks3: [], inputDecks4: [], pickedAssembly: [], userPatches: [], advanced: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<PartyAssemblerProto>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PartyAssemblerProto): PartyAssemblerProto {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated PartyAssemblerProto.InputDeck input_decks_1 */ 1:
                    message.inputDecks1.push(PartyAssemblerProto_InputDeck.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated PartyAssemblerProto.InputDeck input_decks_2 */ 2:
                    message.inputDecks2.push(PartyAssemblerProto_InputDeck.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated PartyAssemblerProto.InputDeck input_decks_3 */ 3:
                    message.inputDecks3.push(PartyAssemblerProto_InputDeck.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated PartyAssemblerProto.InputDeck input_decks_4 */ 4:
                    message.inputDecks4.push(PartyAssemblerProto_InputDeck.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated PartyAssemblerProto.PickedAssembly picked_assembly */ 5:
                    message.pickedAssembly.push(PartyAssemblerProto_PickedAssembly.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated PartyAssemblerProto.UserPatch user_patches */ 6:
                    message.userPatches.push(PartyAssemblerProto_UserPatch.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* bool advanced */ 7:
                    message.advanced = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PartyAssemblerProto, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated PartyAssemblerProto.InputDeck input_decks_1 = 1; */
        for (let i = 0; i < message.inputDecks1.length; i++)
            PartyAssemblerProto_InputDeck.internalBinaryWrite(message.inputDecks1[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated PartyAssemblerProto.InputDeck input_decks_2 = 2; */
        for (let i = 0; i < message.inputDecks2.length; i++)
            PartyAssemblerProto_InputDeck.internalBinaryWrite(message.inputDecks2[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* repeated PartyAssemblerProto.InputDeck input_decks_3 = 3; */
        for (let i = 0; i < message.inputDecks3.length; i++)
            PartyAssemblerProto_InputDeck.internalBinaryWrite(message.inputDecks3[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* repeated PartyAssemblerProto.InputDeck input_decks_4 = 4; */
        for (let i = 0; i < message.inputDecks4.length; i++)
            PartyAssemblerProto_InputDeck.internalBinaryWrite(message.inputDecks4[i], writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* repeated PartyAssemblerProto.PickedAssembly picked_assembly = 5; */
        for (let i = 0; i < message.pickedAssembly.length; i++)
            PartyAssemblerProto_PickedAssembly.internalBinaryWrite(message.pickedAssembly[i], writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* repeated PartyAssemblerProto.UserPatch user_patches = 6; */
        for (let i = 0; i < message.userPatches.length; i++)
            PartyAssemblerProto_UserPatch.internalBinaryWrite(message.userPatches[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* bool advanced = 7; */
        if (message.advanced !== false)
            writer.tag(7, WireType.Varint).bool(message.advanced);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PartyAssemblerProto
 */
export const PartyAssemblerProto = new PartyAssemblerProto$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PartyAssemblerProto_InputDeck$Type extends MessageType<PartyAssemblerProto_InputDeck> {
    constructor() {
        super("PartyAssemblerProto.InputDeck", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "published", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<PartyAssemblerProto_InputDeck>): PartyAssemblerProto_InputDeck {
        const message = { id: "", published: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<PartyAssemblerProto_InputDeck>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PartyAssemblerProto_InputDeck): PartyAssemblerProto_InputDeck {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string id */ 1:
                    message.id = reader.string();
                    break;
                case /* bool published */ 2:
                    message.published = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PartyAssemblerProto_InputDeck, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string id = 1; */
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        /* bool published = 2; */
        if (message.published !== false)
            writer.tag(2, WireType.Varint).bool(message.published);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PartyAssemblerProto.InputDeck
 */
export const PartyAssemblerProto_InputDeck = new PartyAssemblerProto_InputDeck$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PartyAssemblerProto_PickedAssembly$Type extends MessageType<PartyAssemblerProto_PickedAssembly> {
    constructor() {
        super("PartyAssemblerProto.PickedAssembly", [
            { no: 1, name: "decks", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PartyAssemblerProto_PickedAssembly_Deck }
        ]);
    }
    create(value?: PartialMessage<PartyAssemblerProto_PickedAssembly>): PartyAssemblerProto_PickedAssembly {
        const message = { decks: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<PartyAssemblerProto_PickedAssembly>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PartyAssemblerProto_PickedAssembly): PartyAssemblerProto_PickedAssembly {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated PartyAssemblerProto.PickedAssembly.Deck decks */ 1:
                    message.decks.push(PartyAssemblerProto_PickedAssembly_Deck.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PartyAssemblerProto_PickedAssembly, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated PartyAssemblerProto.PickedAssembly.Deck decks = 1; */
        for (let i = 0; i < message.decks.length; i++)
            PartyAssemblerProto_PickedAssembly_Deck.internalBinaryWrite(message.decks[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PartyAssemblerProto.PickedAssembly
 */
export const PartyAssemblerProto_PickedAssembly = new PartyAssemblerProto_PickedAssembly$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PartyAssemblerProto_PickedAssembly_Deck$Type extends MessageType<PartyAssemblerProto_PickedAssembly_Deck> {
    constructor() {
        super("PartyAssemblerProto.PickedAssembly.Deck", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "rename", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "patch_adds", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "patch_removes", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "comments", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<PartyAssemblerProto_PickedAssembly_Deck>): PartyAssemblerProto_PickedAssembly_Deck {
        const message = { id: "", rename: "", patchAdds: [], patchRemoves: [], comments: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<PartyAssemblerProto_PickedAssembly_Deck>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PartyAssemblerProto_PickedAssembly_Deck): PartyAssemblerProto_PickedAssembly_Deck {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string id */ 1:
                    message.id = reader.string();
                    break;
                case /* string rename */ 2:
                    message.rename = reader.string();
                    break;
                case /* repeated string patch_adds */ 3:
                    message.patchAdds.push(reader.string());
                    break;
                case /* repeated string patch_removes */ 4:
                    message.patchRemoves.push(reader.string());
                    break;
                case /* string comments */ 5:
                    message.comments = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PartyAssemblerProto_PickedAssembly_Deck, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string id = 1; */
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        /* string rename = 2; */
        if (message.rename !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.rename);
        /* repeated string patch_adds = 3; */
        for (let i = 0; i < message.patchAdds.length; i++)
            writer.tag(3, WireType.LengthDelimited).string(message.patchAdds[i]);
        /* repeated string patch_removes = 4; */
        for (let i = 0; i < message.patchRemoves.length; i++)
            writer.tag(4, WireType.LengthDelimited).string(message.patchRemoves[i]);
        /* string comments = 5; */
        if (message.comments !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.comments);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PartyAssemblerProto.PickedAssembly.Deck
 */
export const PartyAssemblerProto_PickedAssembly_Deck = new PartyAssemblerProto_PickedAssembly_Deck$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PartyAssemblerProto_UserPatch$Type extends MessageType<PartyAssemblerProto_UserPatch> {
    constructor() {
        super("PartyAssemblerProto.UserPatch", [
            { no: 1, name: "id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "url", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<PartyAssemblerProto_UserPatch>): PartyAssemblerProto_UserPatch {
        const message = { id: 0, name: "", url: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<PartyAssemblerProto_UserPatch>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PartyAssemblerProto_UserPatch): PartyAssemblerProto_UserPatch {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 id */ 1:
                    message.id = reader.int32();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string url */ 3:
                    message.url = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PartyAssemblerProto_UserPatch, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).int32(message.id);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string url = 3; */
        if (message.url !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.url);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PartyAssemblerProto.UserPatch
 */
export const PartyAssemblerProto_UserPatch = new PartyAssemblerProto_UserPatch$Type();