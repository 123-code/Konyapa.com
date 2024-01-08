package models

import (
    "github.com/google/uuid"
    "gorm.io/gorm"
)

type Profile struct {
    gorm.Model
    ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    UserName string `json:"name"`
    Email    string `gorm:"uniqueIndex"`
    JINombre string
    JIValor  int
    JItype   string
}

func (p *Profile) BeforeCreate(tx *gorm.DB) error {
    p.ID = uuid.New()
    return nil
}