let
    Source = Table.FromColumns({Lines.FromBinary(File.Contents("E:\Dyota\OneDrive\Projects\Web\Home opens scraper\OutputsoutputLines.txt"), null, null, 1252)}),

    Address_source  = Table.SelectRows(Source, each Text.Contains([Column1], "Address:")),
    Address_i = Table.AddIndexColumn(Address_source, "Index"),
    Address_c = Table.AddColumn(Address_i, "Address_source", each Text.Middle(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2),0,Text.Length(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2))-1)),
    Address_s = Table.AddColumn(Address_c, "Suburb", each Text.Trim(Text.Middle(  Text.Middle([Address_source], Text.PositionOf([Address_source], ",")+2)  , 0, Text.PositionOf(Text.Middle([Address_source], Text.PositionOf([Address_source], ",")+2), ",")))),
    Address_p = Table.AddColumn(Address_s,"Postcode",each Text.Middle([Address_source], Text.Length([Address_source])-4,4)),
    Address_short = Table.AddColumn(Address_p,"Address",each Text.Middle([Address_source], 0, Text.PositionOf([Address_source], ","))),
    Address = Table.SelectColumns(Address_short, {"Index", "Suburb", "Postcode", "Address"}),
    
    Type_source  = Table.SelectRows(Source, each Text.Contains([Column1], "Type:")),
    Type_i = Table.AddIndexColumn(Type_source, "Index"),
    Type_c = Table.AddColumn(Type_i, "Type", each Text.Middle(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2),0,Text.Length(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2))-1)),
    Type = Table.SelectColumns(Type_c, {"Type", "Index"}),
    
    Bedrooms_source  = Table.SelectRows(Source, each Text.Contains([Column1], "Bedrooms:")),
    Bedrooms_i = Table.AddIndexColumn(Bedrooms_source, "Index"),
    Bedrooms_c = Table.AddColumn(Bedrooms_i, "Bedrooms", each Text.Middle(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2),0,Text.Length(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2))-1)),
    Bedrooms = Table.SelectColumns(Bedrooms_c, {"Bedrooms", "Index"}),
    
    Bathrooms_source  = Table.SelectRows(Source, each Text.Contains([Column1], "Bathrooms:")),
    Bathrooms_i = Table.AddIndexColumn(Bathrooms_source, "Index"),
    Bathrooms_c = Table.AddColumn(Bathrooms_i, "Bathrooms", each Text.Middle(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2),0,Text.Length(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2))-1)),
    Bathrooms = Table.SelectColumns(Bathrooms_c, {"Bathrooms", "Index"}),
    
    Car_Spaces_source  = Table.SelectRows(Source, each Text.Contains([Column1], "Car Spaces:")),
    Car_Spaces_i = Table.AddIndexColumn(Car_Spaces_source, "Index"),
    Car_Spaces_c = Table.AddColumn(Car_Spaces_i, "Car_Spaces", each Text.Middle(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2),0,Text.Length(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2))-1)),
    Car_Spaces = Table.SelectColumns(Car_Spaces_c, {"Car_Spaces", "Index"}),
    
    Times_source  = Table.SelectRows(Source, each Text.Contains([Column1], "Time:")),
    Times_i = Table.AddIndexColumn(Times_source, "Index"),
    Times_c = Table.AddColumn(Times_i, "Times", each Text.Middle(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2),0,Text.Length(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2))-1)),
    Times_start = Table.AddColumn(Times_c, "Start", each Text.Middle([Times], 0 , Text.PositionOf([Times], " - "))),
    Times_mid = Table.AddColumn(Times_start, "Mid", each  Text.Middle([Times], Text.PositionOf([Times], " - ")+3)),
    Times_end = Table.AddColumn(Times_mid, "End", each Text.Middle([Mid], 0, Text.PositionOf([Mid], " Add")) ),
    Times_selected = Table.SelectColumns(Times_end, {"Index", "Start", "End"}),
    Times = Table.TransformColumnTypes(Times_selected,{{"Start", type time}, {"End", type time}}), 

    Price_source  = Table.SelectRows(Source, each Text.Contains([Column1], "Price:")),
    Price_i = Table.AddIndexColumn(Price_source, "Index"),
    Price_c = Table.AddColumn(Price_i, "Price_source", each Text.Middle(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2),0,Text.Length(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2))-1)),
    Price_n = Table.AddColumn(Price_c, "Price", each 
        Text.Middle([Price_source], Text.PositionOf([Price_source], "$"))
    ),
    Price = Table.SelectColumns(Price_n, {"Price", "Index"}),

    Link_source  = Table.SelectRows(Source, each Text.Contains([Column1], "Link:")),
    Link_i = Table.AddIndexColumn(Link_source, "Index"),
    Link_c = Table.AddColumn(Link_i, "Link", each Text.Middle(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2),0,Text.Length(Text.Middle([Column1],Text.PositionOf([Column1], ":")+2))-1)),
    Link = Table.SelectColumns(Link_c, {"Link", "Index"}),
    
    AT = Table.Join(Address, "Index", Type, "Index"),
    ATB = Table.Join(AT, "Index", Bedrooms, "Index"),
    ATBB = Table.Join(ATB, "Index", Bathrooms, "Index"),
    ATBBC = Table.Join(ATBB, "Index", Car_Spaces, "Index"),
    ATBBCT = Table.Join(ATBBC, "Index", Times, "Index"),
    ATBBCTP = Table.Join(ATBBCT, "Index", Price, "Index"),
    ATBBCTPL = Table.Join(ATBBCTP, "Index", Link, "Index"),
    #"Removed Columns" = Table.RemoveColumns(ATBBCTPL,{"Index"}),
    #"Reordered Columns" = Table.ReorderColumns(#"Removed Columns",{"Suburb", "Address", "Type", "Bedrooms", "Bathrooms", "Car_Spaces", "Start", "End", "Price", "Link"})
in
    #"Reordered Columns"